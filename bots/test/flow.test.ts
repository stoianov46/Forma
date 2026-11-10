import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STEP_ORDER, SKIPPABLE_STEPS, createLeadState, formatLeadForStaff, isComplete, nextStep, previousStep, stepIndex, type LeadState } from '../shared/flow';

const complete = (): LeadState => ({
  ...createLeadState('telegram', '42'),
  locale: 'ru',
  service: 'villa-design',
  location: 'koh-phangan',
  projectType: 'villa-residence',
  description: 'Plot in Sri Thanu, 3 bedrooms',
  contactName: 'Ana',
  contactMethod: 'email',
  contactValue: 'ana@example.com',
});

test('the flow starts at language and ends at done, in the specified order', () => {
  assert.equal(STEP_ORDER[0], 'language');
  assert.equal(STEP_ORDER[STEP_ORDER.length - 1], 'done');
  assert.deepEqual(STEP_ORDER.slice(1, 5), ['service', 'location', 'projectType', 'description']);
  assert.equal(new Set(STEP_ORDER).size, STEP_ORDER.length);
});

test('nextStep and previousStep walk the order and stop at the ends', () => {
  assert.equal(nextStep('language'), 'service');
  assert.equal(previousStep('service'), 'language');
  assert.equal(previousStep('language'), 'language');
  assert.equal(nextStep('done'), 'done');
  for (const s of STEP_ORDER.slice(0, -1)) assert.equal(stepIndex(nextStep(s)), stepIndex(s) + 1);
});

test('only budget, timeline and attachments are skippable', () => {
  assert.deepEqual([...SKIPPABLE_STEPS].sort(), ['attachments', 'budget', 'timeline']);
});

test('a new lead starts empty on the language step', () => {
  const s = createLeadState('whatsapp', 'abc');
  assert.equal(s.step, 'language');
  assert.equal(s.channel, 'whatsapp');
  assert.deepEqual(s.attachments, []);
  assert.ok(!Number.isNaN(Date.parse(s.startedAt)));
  assert.equal(isComplete(s), false);
});

test('isComplete needs language, service, location, type, description and contact; budget/timeline/files are optional', () => {
  assert.equal(isComplete(complete()), true);
  for (const key of ['locale', 'service', 'location', 'projectType', 'description', 'contactName', 'contactMethod', 'contactValue'] as const) {
    const s = complete();
    delete s[key];
    assert.equal(isComplete(s), false, `missing ${key}`);
  }
});

test('staff message lists every answer and never prints "undefined"', () => {
  const text = formatLeadForStaff({ ...complete(), budget: '5 million', attachments: [{ fileId: 'f1', kind: 'photo' }], sourceUrl: 'https://forma.in.th/services/villa-design/', utmSource: 'g', utmCampaign: 'villa' });
  for (const part of ['telegram project enquiry', 'Language: ru', 'Service: villa-design', 'Location: koh-phangan', 'Project type: villa-residence', 'Budget: 5 million', 'Plot in Sri Thanu', 'Ana via email (ana@example.com)', 'Attachments: 1', 'Source: https://forma.in.th/services/villa-design/', 'UTM source/campaign: g / villa']) {
    assert.ok(text.includes(part), `missing "${part}"`);
  }
  assert.ok(!text.includes('undefined'));
});

test('optional answers show a neutral placeholder, and source/UTM lines are omitted when absent', () => {
  const text = formatLeadForStaff(complete());
  assert.ok(text.includes('Budget: not provided') && text.includes('Timeline: not provided'));
  assert.ok(!text.includes('Source:') && !text.includes('UTM'));
  assert.ok(!text.includes('undefined'));
});
