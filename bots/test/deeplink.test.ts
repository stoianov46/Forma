import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { applyStartPayload } from '../shared/deeplink';
import { SERVICES } from '../shared/flow';

test('service_<slug> preselects the service', () => {
  const s: { service?: string; location?: string } = {};
  applyStartPayload(s as never, 'service_villa-design');
  assert.equal(s.service, 'villa-design');
  assert.equal(s.location, undefined);
});

test('location_<slug> preselects the location', () => {
  const s: { service?: string; location?: string } = {};
  applyStartPayload(s as never, 'location_koh-samui');
  assert.equal(s.location, 'koh-samui');
});

test('every website service slug is accepted', () => {
  for (const slug of SERVICES) {
    const s: { service?: string } = {};
    applyStartPayload(s as never, `service_${slug}`);
    assert.equal(s.service, slug);
  }
});

test('unknown kinds, unknown slugs, empty and forged payloads are ignored', () => {
  for (const payload of [undefined, '', 'service_', 'service_nope', 'location_atlantis', 'admin_true', 'service_../../etc', 'SERVICE_architecture', 'service_architecture;drop']) {
    const s: { service?: string; location?: string } = {};
    applyStartPayload(s as never, payload);
    assert.deepEqual(s, {}, String(payload));
  }
});

test('the website builds links in the same format the bot parses', () => {
  const src = fs.readFileSync(path.join(import.meta.dirname, '../../src/components/blocks/ContactChannels.astro'), 'utf8');
  assert.match(src, /`service_\$\{service\}`/);
  assert.match(src, /`location_\$\{location\}`/);
  assert.match(src, /\?start=\$\{payload\}/);
});
