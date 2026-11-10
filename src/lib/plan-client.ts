/** Client behaviour of the /plan/ page (service finder, cost estimator, timeline). Imported by PlanTools.astro. */
import { estimate, summarize, validate, type EstimateInput } from './estimate';
  import { recommend, complete, type Answers } from './finder';
  import { PRICES, formatPrice, type PriceId } from '../content/pricing';

  const root = document.getElementById('plan-root') as HTMLElement;
  const cfg = JSON.parse(root.dataset.config || '{}');
  const c = cfg.content;
  const nf = new Intl.NumberFormat('en-US');
  const thb = (n: number) => '฿' + nf.format(n);
  const range = (min: number, max: number) => `${thb(min)}–${thb(max)}`;
  const fill = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
  const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

  // --- tabs -------------------------------------------------------------------------------
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.plan-tab'));
  function showTab(id: string) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.classList.toggle('bg-ink-900', on);
      t.classList.toggle('text-stone-50', on);
      document.getElementById('panel-' + t.dataset.tab)?.classList.toggle('hidden', !on);
    });
  }
  tabs.forEach((t) => t.addEventListener('click', () => { showTab(t.dataset.tab!); history.replaceState(null, '', '#' + t.dataset.tab); }));
  const initial = location.hash.replace('#', '');
  showTab(['finder', 'estimator', 'timeline'].includes(initial) ? initial : 'finder');

  const contactUrl = (params: Record<string, string>) => {
    const q = new URLSearchParams(params);
    return `${cfg.contact}?${q.toString()}`;
  };
  const clear = (n: HTMLElement) => { while (n.firstChild) n.removeChild(n.firstChild); };
  const node = (tag: string, cls = '', text = '') => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };

  // --- finder -----------------------------------------------------------------------------
  const finderForm = el<HTMLFormElement>('finder-form');
  finderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const a: Answers = {};
    const val = (name: string) => (finderForm.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement | null)?.value;
    a.situation = val('situation') as Answers['situation'];
    a.scope = val('scope') as Answers['scope'];
    a.permits = val('permits') as Answers['permits'];
    a.contractor = val('contractor') as Answers['contractor'];
    a.extras = Array.from(finderForm.querySelectorAll<HTMLInputElement>('input[name="extras"]:checked')).map((i) => i.value) as Answers['extras'];
    const hint = el('finder-hint');
    const out = el('finder-result');
    if (!complete(a)) { hint.classList.remove('hidden'); out.classList.add('hidden'); return; }
    hint.classList.add('hidden');
    const slugs = recommend(a);
    clear(out);
    out.append(node('h3', 'text-xl', c.finder.resultHeading), node('p', 'body-m mt-2 max-w-2xl text-ink-900/70', c.finder.resultIntro));
    const list = node('ol', 'mt-6 grid gap-4 md:grid-cols-2');
    slugs.forEach((slug, i) => {
      const s = cfg.services[slug];
      if (!s) return;
      const li = node('li', 'rounded-xl border border-ink-900/10 p-5');
      li.append(node('p', 'text-xs font-semibold tracking-wide text-olive-700 uppercase', String(i + 1).padStart(2, '0')));
      li.append(node('h4', 'mt-1 text-lg font-medium', s.label));
      li.append(node('p', 'body-m mt-1 text-ink-900/70', c.finder.reasons[slug] || ''));
      const link = node('a', 'mt-3 inline-block text-sm font-medium text-olive-700 underline', c.finder.viewService) as HTMLAnchorElement;
      link.href = s.href;
      li.append(link);
      list.append(li);
    });
    out.append(list);
    const summary = `Service finder: ${a.situation}, scope ${a.scope ?? 'n/a'}, extras ${(a.extras ?? []).join('+') || 'none'}, permits ${a.permits ?? 'n/a'}, own contractor ${a.contractor ?? 'n/a'} -> ${slugs.join(', ')}`.slice(0, 480);
    const ask = node('a', 'mt-6 inline-flex rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-stone-50 hover:bg-olive-700', c.finder.askLabel) as HTMLAnchorElement;
    ask.href = contactUrl({ service: slugs[0] ?? '', plan: summary });
    const again = node('button', 'ms-3 rounded-full border border-ink-900/25 px-7 py-3.5 text-sm font-medium hover:bg-stone-100', c.finder.restart) as HTMLButtonElement;
    again.type = 'button';
    again.addEventListener('click', () => { finderForm.reset(); out.classList.add('hidden'); finderForm.scrollIntoView({ behavior: 'smooth' }); });
    out.append(ask, again);
    out.classList.remove('hidden');
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // --- estimator --------------------------------------------------------------------------
  const estForm = el<HTMLFormElement>('estimator-form');
  const modeSel = el<HTMLSelectElement>('est-mode');
  function syncModes() {
    estForm.querySelectorAll<HTMLElement>('[data-modes]').forEach((n) => { n.hidden = !(n.dataset.modes || '').split(' ').includes(modeSel.value); });
  }
  modeSel.addEventListener('change', syncModes);
  syncModes();
  estForm.addEventListener('reset', () => setTimeout(() => { syncModes(); el('estimator-result').classList.add('hidden'); }, 0));

  const tier = (v: string, order: string[]): 'none' | 0 | 1 | 2 => (v === 'none' ? 'none' : (order.indexOf(v) as 0 | 1 | 2));
  function readInput(): EstimateInput {
    const g = (n: string) => (estForm.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement).value;
    const chk = (n: string) => (estForm.elements.namedItem(n) as HTMLInputElement).checked;
    return {
      area: Number(g('area')),
      size: Number(g('size')) as 0 | 1 | 2,
      mode: g('mode') as EstimateInput['mode'],
      interior: g('interior') as EstimateInput['interior'],
      landscape: chk('landscape'),
      permits: tier(g('permits'), ['standard', 'variances', 'complex']),
      eco: tier(g('eco'), ['passive', 'energy', 'full']),
      pm: chk('pm'),
      supervision: tier(g('supervision'), ['monthly', 'biweekly', 'weekly']),
      techSupervision: chk('techSupervision'),
    };
  }
  function basisText(l: ReturnType<typeof estimate>['lines'][number]): string {
    const b = l.basis;
    const price = formatPrice(b.priceId as PriceId);
    const E = c.estimator.basis;
    if (b.kind === 'per-m2') return fill(E.perM2, { area: nf.format(b.area), price });
    if (b.kind === 'fixed') return fill(E.fixed, { price });
    if (b.kind === 'percent') return fill(E.percent, { price });
    if (b.kind === 'uplift') return fill(E.uplift, { price });
    return fill(E.perMonth, { months: `${b.months.min}–${b.months.max}`, price: `${price} ${c.estimator.perMonthUnit}` });
  }
  estForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = readInput();
    const err = el('est-area-error');
    if (validate(input)) { err.classList.remove('hidden'); el('estimator-result').classList.add('hidden'); return; }
    err.classList.add('hidden');
    const est = estimate(input);
    const out = el('estimator-result');
    clear(out);
    out.append(node('h3', 'text-xl', c.estimator.resultHeading));
    const table = node('table', 'mt-4 w-full border-collapse text-start text-sm');
    const body = node('tbody');
    const row = (label: string, basis: string, amount: string, strong = false, ref = false) => {
      const tr = node('tr', 'border-b border-ink-900/10' + (ref ? ' text-ink-900/60' : ''));
      tr.append(node('td', 'py-3 pe-4 ' + (strong ? 'font-semibold' : 'font-medium'), label), node('td', 'py-3 pe-4 text-ink-900/70', basis));
      const amt = node('td', 'py-3 whitespace-nowrap ' + (strong ? 'font-semibold' : ''));
      const b = document.createElement('bdi'); b.setAttribute('dir', 'ltr'); b.textContent = amount; amt.append(b);
      tr.append(amt);
      return tr;
    };
    est.lines.forEach((l) => body.append(row(c.estimator.lines[l.key], basisText(l), range(l.min, l.max))));
    body.append(row(c.estimator.total, '', range(est.total.min, est.total.max), true));
    est.reference.forEach((l) => body.append(row(`${c.estimator.reference}: ${c.estimator.lines[l.key]}`, basisText(l), range(l.min, l.max), false, true)));
    table.append(body);
    const wrap = node('div', 'overflow-x-auto'); wrap.setAttribute('tabindex', '0'); wrap.append(table);
    out.append(wrap);
    out.append(node('p', 'mt-4 max-w-3xl text-xs text-ink-900/60', c.estimator.exclusions));
    out.append(node('p', 'mt-1 text-xs font-semibold tracking-wide text-ink-900/60 uppercase', c.estimator.draft));
    const send = node('a', 'mt-6 inline-flex rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-stone-50 hover:bg-olive-700', c.estimator.send) as HTMLAnchorElement;
    const primary = input.mode === 'oversight' ? 'construction-supervision' : input.mode === 'turnkey' ? 'turnkey-projects' : input.mode === 'design-build' ? 'construction' : 'architecture';
    send.href = contactUrl({ service: primary, plan: summarize(input, est), estimateMin: String(est.total.min), estimateMax: String(est.total.max) });
    out.append(send);
    out.classList.remove('hidden');
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // --- timeline ---------------------------------------------------------------------------
  const tlSize = el<HTMLSelectElement>('tl-size');
  function renderTimeline() {
    const i = Number(tlSize.value);
    const list = el('tl-list');
    clear(list);
    c.timeline.stages.forEach((s: { key: string; title: string; body: string }, n: number) => {
      const li = node('li', 'flex gap-5 rounded-xl border border-ink-900/10 p-5');
      li.append(node('span', 'font-display text-2xl text-olive-600', String(n + 1).padStart(2, '0')));
      const box = node('div');
      box.append(node('h3', 'text-lg font-medium', s.title), node('p', 'body-m mt-1 text-ink-900/70', s.body));
      let when = c.timeline.notEstimated;
      if (s.key === 'concept' || s.key === 'development' || s.key === 'documentation') {
        const r = cfg.timeline.design[s.key][i];
        when = fill(c.timeline.weeks, { min: r.min, max: r.max });
      } else if (s.key === 'construction') {
        const r = cfg.timeline.build[i];
        when = fill(c.timeline.months, { min: r.min, max: r.max });
      }
      box.append(node('p', 'mt-2 text-sm font-semibold', when));
      li.append(box);
      list.append(li);
    });
  }
  tlSize.addEventListener('change', renderTimeline);
  renderTimeline();
