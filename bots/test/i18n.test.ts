import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { BOT_LOCALES, CONTACT_METHODS, LOCATIONS, PROJECT_TYPES, SERVICES } from '../shared/flow';
import { LANGUAGE_BUTTONS, LANGUAGE_PROMPT, botStrings } from '../shared/i18n';

const site = (p: string) => fs.readFileSync(path.join(import.meta.dirname, '../../src/content', p), 'utf8');

test('every bot locale has every service, location, project type and contact method label', () => {
  for (const l of BOT_LOCALES) {
    const s = botStrings[l];
    for (const k of SERVICES) assert.ok(s.services[k]?.trim(), `${l} service ${k}`);
    for (const k of LOCATIONS) assert.ok(s.locations[k]?.trim(), `${l} location ${k}`);
    for (const k of PROJECT_TYPES) assert.ok(s.projectTypes[k]?.trim(), `${l} projectType ${k}`);
    for (const k of CONTACT_METHODS) assert.ok(s.contactMethods[k]?.trim(), `${l} contactMethod ${k}`);
  }
});

test('every prompt, button and message is non-empty in every locale', () => {
  for (const l of BOT_LOCALES) {
    const s = botStrings[l];
    for (const [k, v] of Object.entries({ ...s.prompts, ...s.buttons, submitted: s.submitted, restarted: s.restarted, invalidChoice: s.invalidChoice, fallbackHuman: s.fallbackHuman })) {
      assert.ok(typeof v === 'string' && v.trim().length > 0, `${l}.${k}`);
    }
  }
});

test('non-English locales are really translated (service labels differ from English)', () => {
  for (const l of BOT_LOCALES.filter((x) => x !== 'en')) {
    const same = SERVICES.filter((k) => botStrings[l].services[k] === botStrings.en.services[k]);
    assert.equal(same.length, 0, `${l} still English: ${same.join(', ')}`);
  }
});

test('language picker offers exactly the four site languages', () => {
  assert.deepEqual(LANGUAGE_BUTTONS.map((b) => b.locale), ['en', 'ru', 'th', 'he']);
  for (const w of ['English', 'Русский', 'ไทย', 'עברית']) assert.ok(LANGUAGE_PROMPT.includes('language') || LANGUAGE_BUTTONS.some((b) => b.label === w));
});

test('SERVICES match the 13 services of the website exactly', () => {
  const src = site('services/en.ts');
  const slugs = [...src.slice(0, src.indexOf('servicesEnContent')).matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1]);
  assert.deepEqual([...SERVICES].sort(), slugs.sort());
});

test('LOCATIONS match the website primary locations plus "other"', () => {
  const src = site('locations/en.ts');
  const head = src.slice(0, src.indexOf('locationsEnContent'));
  const blocks = head.split(/\n  \{/).slice(1);
  const primary = blocks.filter((b) => /tier: 'primary'/.test(b)).map((b) => (b.match(/slug: '([a-z-]+)'/) || [])[1]);
  assert.deepEqual([...LOCATIONS].filter((x) => x !== 'other').sort(), primary.sort());
});
