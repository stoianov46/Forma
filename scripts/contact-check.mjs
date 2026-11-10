#!/usr/bin/env node
/**
 * Contact-form check — `npm run contact:check` (CI). NOTHING IS SENT: every network call is a mock.
 *
 * Tests functions/_lib/lead-core.ts (validation, option whitelists, honeypot, message text,
 * Telegram / email / webhook delivery incl. partial and total failure, nothing configured) and
 * checks that no secret or delivery API appears in the built client files (dist/).
 * Exits 1 on any failure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { PROJECT_TYPES, CONTACT_METHODS, LAND_STATUSES, REPLY_LANGUAGES, parseLead, isHoneypot, leadText, deliver, clean, parseBudgetThb, qualify } from '../functions/_lib/lead-core.ts';

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console[ok ? 'log' : 'error'](`${ok ? '  ok  ' : '  FAIL'} ${name}${!ok && detail ? ` — ${detail}` : ''}`);
};
const form = (o) => (k) => o[k];
const valid = { name: 'Ana Ivanova', email: 'ana@example.com', projectType: 'Villa / Residence', message: 'We own a plot in Sri Thanu and want a villa.', locale: 'ru' };

// --- parsing / validation ---------------------------------------------------------------
let r = parseLead(form(valid));
check('valid lead parses', r.ok && r.lead.name === 'Ana Ivanova');
check('reply language defaults to page language', r.ok && r.lead.replyLanguage === 'ru');
r = parseLead(form({ ...valid, replyLanguage: 'he' }));
check('explicit reply language is kept', r.ok && r.lead.replyLanguage === 'he');
r = parseLead(form({ ...valid, replyLanguage: 'xx' }));
check('unknown reply language falls back', r.ok && r.lead.replyLanguage === 'ru');
check('missing name rejected', !parseLead(form({ ...valid, name: '' })).ok);
check('bad email rejected', parseLead(form({ ...valid, email: 'nope' })).error === 'invalid_email');
check('short message rejected', !parseLead(form({ ...valid, message: 'short' })).ok);
check('unknown project type rejected (whitelist)', parseLead(form({ ...valid, projectType: 'Hack' })).error === 'invalid_option');
check('unknown contact method rejected (whitelist)', parseLead(form({ ...valid, preferredContact: 'Pigeon' })).error === 'invalid_option');
check('bad service slug rejected', parseLead(form({ ...valid, service: '../etc' })).error === 'invalid_option');
check('good service/location slugs accepted', parseLead(form({ ...valid, service: 'architecture', location: 'koh-phangan' })).ok);
r = parseLead(form({ ...valid, name: 'A\u0000B\r\nC', message: 'x'.repeat(5000) }));
check('control characters stripped and length capped', r.ok && !/[\u0000\r]/.test(r.lead.name) && r.lead.message.length === 4000);
check('clean() ignores non-strings', clean({}, 10) === '' && clean(null, 10) === '');
check('honeypot detected', isHoneypot(form({ company: 'Spam Ltd' })) && !isHoneypot(form({ company: '' })));
r = parseLead(form({ ...valid, landingPage: '/services/architecture/', referrer: 'google.com', utm_source: 'g', utm_medium: 'cpc', utm_campaign: 'villa' }));
const text = leadText(r.lead, new Date('2026-01-01T00:00:00Z'));
check('staff text carries source, UTM and reply language', /First landing page: \/services\/architecture\/ \(from google.com\)/.test(text) && /UTM source\/medium\/campaign: g \/ cpc \/ villa/.test(text) && /Reply in: ru/.test(text));

// --- budget parsing and lead qualification -------------------------------------------------
const bt = parseBudgetThb;
check('budget: "5 million" → 5,000,000', bt('5 million') === 5_000_000);
check('budget: "฿5,000,000" → 5,000,000', bt('฿5,000,000') === 5_000_000);
check('budget: "3-4M" → the higher figure', bt('3-4M') === 4_000_000);
check('budget: "5 млн" / "5 ล้าน" / "5 מיליון"', bt('5 млн') === 5_000_000 && bt('5 ล้าน') === 5_000_000 && bt('5 מיליון') === 5_000_000);
check('budget: "800k" → 800,000', bt('800k') === 800_000);
check('budget: foreign currency is not guessed', bt('$500k') === null && bt('300 000 EUR') === null);
check('budget: small numbers and words are ignored', bt('3 bedrooms') === null && bt('flexible') === null);
const L = (o) => parseLead(form({ ...valid, ...o })).lead;
let q = qualify(L({}));
check('bare enquiry is LOW priority', q.priority === 'LOW' && q.score < 3);
q = qualify(L({ landStatus: 'Own land', whatsapp: '+66 80 000 0000', service: 'architecture', location: 'koh-phangan', budget: '6 million', estimateMin: '5000000', estimateMax: '7000000', message: 'x'.repeat(220) }));
check('owner with phone, budget in line with the estimate is HIGH', q.priority === 'HIGH' && q.reasons.some((x) => /in line with the estimate/.test(x)), JSON.stringify(q));
q = qualify(L({ budget: '1 million', estimateMin: '5000000', estimateMax: '7000000' }));
check('budget far below the estimate lowers the score', q.reasons.some((x) => /well below/.test(x)));
check('land status is whitelisted', parseLead(form({ ...valid, landStatus: 'Castle' })).error === 'invalid_option' && parseLead(form({ ...valid, landStatus: 'Own land' })).ok);
check('estimate fields accept digits only', L({ estimateMin: '12abc' }).estimateMin === '' && L({ estimateMin: '5000000' }).estimateMin === '5000000');
const qtext = leadText(L({ landStatus: 'Own land', planSummary: 'Estimate THB 1-2', estimateMin: '5000000', estimateMax: '7000000' }), new Date('2026-01-01T00:00:00Z'));
check('staff text shows priority, land, plan summary, estimator range and the reasons', /priority (HIGH|NORMAL|LOW)/.test(qtext) && /Land: Own land/.test(qtext) && /Plan tool: Estimate THB 1-2/.test(qtext) && /Estimator range: THB 5,000,000–7,000,000/.test(qtext) && /Why this priority:/.test(qtext));

// --- delivery ----------------------------------------------------------------------------
const lead = parseLead(form(valid)).lead;
const calls = [];
const okFetch = async (url, init) => (calls.push({ url, init }), { ok: true, status: 200 });
const failFetch = async () => ({ ok: false, status: 500 });
const throwFetch = async () => { throw new Error('network'); };
const tg = { TELEGRAM_BOT_TOKEN: 't0k', TELEGRAM_CHAT_ID: '123' };
const mail = { RESEND_API_KEY: 're_x', CONTACT_EMAIL_FROM: 'FORMA <noreply@example.com>', CONTACT_EMAIL_TO: 'team@example.com' };
const hook = { LEAD_WEBHOOK_URL: 'https://hooks.example.com/lead' };

let d = await deliver({}, lead, okFetch);
check('no channel configured → nothing configured, nothing called', d.configured.length === 0 && calls.length === 0);
d = await deliver({ ...tg, ...mail, ...hook }, lead, okFetch);
check('all three channels used when configured', d.succeeded.join() === 'telegram,email,webhook' && calls.length === 3);
const emailCall = calls.find((c) => c.url.includes('resend'));
const body = JSON.parse(emailCall.init.body);
check('email subject carries the priority tag', /^\[(HIGH|NORMAL|LOW)\]/.test(body.subject));
check('email: Bearer auth, reply_to is the visitor, to is CONTACT_EMAIL_TO', emailCall.init.headers.authorization === 'Bearer re_x' && body.reply_to === lead.email && body.to[0] === 'team@example.com');
check('webhook receives the structured lead', JSON.parse(calls.find((c) => c.url.startsWith('https://hooks')).init.body).lead.email === lead.email);
d = await deliver({ RESEND_API_KEY: 're_x' }, lead, okFetch);
check('partially configured email is not a channel', d.configured.length === 0);
d = await deliver({ ...tg, ...hook }, lead, async (url) => (url.includes('telegram') ? { ok: false, status: 502 } : { ok: true, status: 200 }));
check('one channel failing still counts as delivered', d.succeeded.join() === 'webhook' && d.failed.join() === 'telegram');
d = await deliver({ ...tg, ...mail }, lead, failFetch);
check('all channels failing → no success', d.succeeded.length === 0 && d.failed.length === 2);
d = await deliver(tg, lead, throwFetch);
check('network error is caught, not thrown', d.failed.join() === 'telegram');
const subj = JSON.parse((await (async () => { const c = []; await deliver(mail, { ...lead, name: 'Bob\nBcc: x' }, async (u, i) => (c.push(i), { ok: true, status: 200 })); return c[0]; })()).body).subject;
check('email subject has no newlines (header injection)', !/[\r\n]/.test(subj));

// --- option lists match the form's English labels ------------------------------------------
const dict = fs.readFileSync(path.join(process.cwd(), 'src/i18n/dictionary.ts'), 'utf8');
const enForm = dict.slice(dict.indexOf("heading: 'Start a Project'"));
const list = (key) => [...enForm.slice(enForm.indexOf(key)).match(/\[(.*?)\]/)[1].matchAll(/'([^']*)'/g)].map((m) => m[1]);
check('PROJECT_TYPES equals the English form options', JSON.stringify(list('projectTypeOptions')) === JSON.stringify([...PROJECT_TYPES]));
check('CONTACT_METHODS equals the English form options', JSON.stringify(list('contactMethodOptions')) === JSON.stringify([...CONTACT_METHODS]));
check('LAND_STATUSES equals the English form options', JSON.stringify(list('landOptions')) === JSON.stringify([...LAND_STATUSES]));
check('reply languages are the four site languages', REPLY_LANGUAGES.join() === 'en,ru,th,he');

// --- no secrets / delivery APIs in client files ---------------------------------------------
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  const bad = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (/\.(html|js|css|json|txt)$/.test(e.name)) {
        const c = fs.readFileSync(f, 'utf8');
        if (/api\.telegram\.org|api\.resend\.com|TELEGRAM_BOT_TOKEN|RESEND_API_KEY|LEAD_WEBHOOK_URL|\b\d{8,10}:[A-Za-z0-9_-]{30,}\b/.test(c)) bad.push(f.slice(distDir.length));
      }
    }
  })(distDir);
  check('no Telegram/Resend/webhook secrets or APIs in dist/', bad.length === 0, bad.slice(0, 3).join(', '));
  const contact = fs.existsSync(path.join(distDir, 'contact/index.html')) ? fs.readFileSync(path.join(distDir, 'contact/index.html'), 'utf8') : '';
  check('contact page has the review step, reply-language field and honeypot', /id="lead-review"/.test(contact) && /name="replyLanguage"/.test(contact) && /name="company"/.test(contact));
  check('form option values are stable English values', /<option value="Villa \/ Residence"/.test(contact));
  const ru = fs.existsSync(path.join(distDir, 'ru/contact/index.html')) ? fs.readFileSync(path.join(distDir, 'ru/contact/index.html'), 'utf8') : '';
  check('RU form keeps English option values with Russian labels', /<option value="Villa \/ Residence">[^<]*[А-Яа-я]/.test(ru));
} else check('dist/ exists (run npm run build first)', false);

console.log(failures ? `\ncontact-check: ${failures} failure(s)` : '\ncontact-check: all checks passed (nothing was sent)');
process.exit(failures ? 1 : 0);
