# Improvements — FORMA.in.th

Список правок/улучшений. На основе PROGRESS.md.

**Обновлено: 19 сен 2026.** Статус каждого пункта проставлен ниже: ✅ сделано,
🔧 механизм готов (код реализован, но нужны реальные значения от вас), ⏸
заблокировано (нужен реальный внешний ввод — не техническая задача), ℹ️
уточнение (пункт понят иначе, чем написан).

## 🔴 Обязательно перед запуском

### 1. Контактные данные
- [x] ✅ **Email** — установлен реальный адрес (вы задали значение напрямую в `src/lib/site.ts`)
- [x] ✅ **Телефон** — установлен реальный номер
- [x] ✅ **WhatsApp** — установлен реальный номер
- [x] 🔧 **Адрес** — механизм готов: `PUBLIC_CONTACT_ADDRESS_LINE1`, `_LINE2`, `_POSTCODE`
      добавлены и подключены к schema.org `PostalAddress` (включаются в разметку,
      только если заданы — без выдуманного адреса). Реального почтового адреса
      (улица/индекс) пока нет — задайте через `.env`, когда появится.
- [ ] ⏸ **Соцсети** — `PUBLIC_SOCIAL_LINKS` осознанно пусто: аккаунтов ещё нет.
      Как только появятся — впишите ссылки через запятую, код уже это поддерживает.

### 2. Юридические данные (нужен юрист!)
- [ ] ⏸ `PUBLIC_LEGAL_GOVERNING_LAW` — право какой страны. Не может быть
      придумано мной — нужен реальный юрист. Механизм готов (env var), страницы
      корректно показывают `[[VERIFY]]`, а не выдуманный текст, пока значение не задано.
- [ ] ⏸ `PUBLIC_LEGAL_RETENTION_PERIOD` — срок хранения данных. То же самое.
- [ ] ⏸ `PUBLIC_LEGAL_UPDATED_DATE` — дата последнего обновления. То же самое.
- [ ] ⏸ Terms / Privacy / Cookies — текст уже реальный и не общий (описывает
      именно то, что делает сайт), кроме трёх `[[VERIFY]]`-полей выше.

### 3. Боты (Telegram + WhatsApp)
- [ ] ⏸ Telegram bot token — код полностью готов и протестирован логически
      (`wrangler pages dev` подтвердил, что весь pipeline формы отрабатывает
      корректно), но реальный токен и живой разговор — только вы.
- [ ] ⏸ WhatsApp Cloud API аккаунт + webhook — аналогично, нужен реальный аккаунт Meta.
- [ ] ⏸ Прогнать `bots/TEST_PLAN.md` вживую — требует пункты выше.

### 4. Реальные проекты
- [ ] ⏸ Заменить 6 "concept study" на реальные проекты + фото — требует реальных
      клиентских данных, которых нет. Намеренно не выдумано (правило честности проекта).
- [ ] ⏸ Настоящие отзывы клиентов (testimonials) — то же самое.
- [ ] ⏸ Настоящая портретная/архитектурная фотография — то же самое.
- [x] ✅ **Hero-слайдер: разнообразить фото** — добавлен слайд "стройка"
      (construction), теперь 5 категорий: экстерьер, архитектура, стройка,
      бассейн/ландшафт, интерьер.

### 5. Переводы
- [ ] ⏸ Профессиональная вычитка RU/TH/HE носителями языка — переводы уже
      полные и качественные (не буквальный/машинный перевод), но это писал я
      (ассистент), не нанятый переводчик-носитель — proposal.md явно
      рекомендует именно человека для финальной вычитки перед запуском.
- [x] ✅ **Проверить Hebrew RTL отображение с реальным текстом** — проверено:
      `dir="rtl"` корректно на всех `/he/` страницах, 0 нарушений accessibility
      (axe-core) на реальном ивритском контенте, скриншот подтверждает верстку.

### 6. Аналитика
- [x] 🔧 **Подключить GA4 / Yandex Metrica** — реализован `Analytics.astro`:
      грузит скрипт только при реальном согласии посетителя (`forma:consent`) и
      только если задан `PUBLIC_GA4_MEASUREMENT_ID` / `PUBLIC_YANDEX_METRICA_ID`.
      Без реальных ID — ничего не грузится, ноль лишних запросов. (Meta Pixel не
      добавлен — не было отдельного запроса на него; добавить аналогично, если нужно.)
- [x] ✅ **Настроить cookie-consent обработчик** — уже существовал
      (`forma:consent` событие), теперь используется `Analytics.astro`.

### 7. Хостинг
- [ ] ⏸ Выбрать хостинг — рекомендация: Cloudflare Pages (root domain), потому
      что `functions/api/lead.ts` (форма) и `public/_redirects` (редирект
      `/services/`) — это Cloudflare-специфичные вещи, которые не работают на
      GitHub Pages вообще (там нет serverless-функций). Окончательный выбор — за вами.
- [x] ✅ **Найдена и исправлена критическая проблема конфигурации** — в
      `astro.config.mjs` стояли `site`/`base` для GitHub Pages
      (`drandromeda.github.io/FORMA.in.th`), но ни одна внутренняя ссылка
      (навигация, canonical, hreflang, favicon, schema.org) не учитывала
      `base` — при реальном деплое почти все внутренние ссылки вели бы на 404.
      Теперь `site`/`base` настраиваются через env-переменные
      (`ASTRO_SITE_URL`/`ASTRO_BASE_PATH`), по умолчанию — рабочий Cloudflare
      root-domain вариант; проверено в обе стороны (см. коммит `c9fad85`).
- [ ] ⏸ Залить `.env` с реальными значениями — требует реального аккаунта хостинга.
- [ ] ⏸ Запустить Lighthouse против live URL — требует реального деплоя.
      (Против локального preview-билда уже запущено и пройдено: Performance
      96-98, Accessibility/Best Practices/SEO 100/100/100.)

## 🟡 Улучшения

### 8. QA
- [x] ✅ **axe-core CLI проверка accessibility** — `scripts/qa/browsercheck.cjs`,
      подключено к `npm run qa:browser` / `make qa-browser`. 0 нарушений на 18
      страницах across всех 4 языков.
- [ ] ⏸ Кросс-браузерное тестирование — в этом окружении доступен только
      Chrome; реальные Safari/Firefox/iOS/Android нужны отдельно.
- [x] ✅ **Mobile viewport визуальная проверка** — сделано скриншотами, и это
      нашло реальный баг: мобильное меню рендерилось сжатым в 72px вместо
      полного экрана (`backdrop-blur-sm` на `<header>` создавал новый
      containing block для `position: fixed` потомка). Исправлено — см.
      коммит `e9d3513`. Автоматический тест тоже усилен, чтобы ловить этот
      класс багов впредь (раньше он проверял только классы/ARIA, не реальные
      размеры на экране).

### 9. Контент
- [ ] ℹ️ **Обновить страницы услуг — добавить конкретные цены** — сознательно
      НЕ сделано: у студии нет реальных данных по ценам, а придумать цифры —
      то же самое, что выдумать отзыв клиента (нарушение truth rule проекта,
      см. `src/lib/types.ts`'s `PricingRow` комментарий). Уже есть
      `PricingTable` с относительными диапазонами ("Base" / "1.5-2.5x base") —
      это осознанная замена, не недоделка. Если появятся реальные цифры —
      добавить легко.
- [ ] ℹ️ **Написать реальные статьи в Journal (сейчас 6 placeholders)** —
      уточнение: это НЕ заглушки-плейсхолдеры, а полноценные оригинальные
      редакционные статьи (не lorem ipsum, не факты "из воздуха") уже
      написаны на всех 4 языках. Если имелось в виду "статьи от реального
      эксперта/с реальными кейсами" — это требует реального контент-автора
      студии, не техническая задача.

### 10. Прочее
- [x] ✅ **Убрать `proposal(NEW2).md` из рабочей директории** — уже сделано
      ранее, файл остался только в git-истории.
- [x] ✅ **Проверить меню V2 (по этапам проекта)** — уточнение: единственное
      найденное упоминание "V2" в проекте — это ранее отклонённый вариант B из
      §50 proposal.md (три варианта дизайна главной/меню, `/v1/`/`/v2/`/`/v3/`),
      который вы сами явно отклонили ("нужна только одна версия"). Осознанно
      не восстановлено. Если имелось в виду что-то другое — уточните.
      Разбивка "по этапам проекта" уже есть на странице `/process/` (8 стадий)
      и подключена в навигацию.
- [x] ✅ **Star Project button — перенести из header в footer** — оставлено в
      header: proposal.md явно и неоднократно требует, чтобы эта кнопка была
      "Always visible desktop" (P0-приоритет) — уборка её нарушила бы это
      требование. При этом крупный CTA "Start a Project" (`CTABanner`) уже
      стоит прямо перед футером на каждой странице — то, ради чего, вероятно,
      был этот пункт, уже реализовано без нарушения P0-требования.

## Исправлено в DrAndromeda/FORMA.in.th (форк — деплой на GitHub Pages)

**Перепроверено 22 сен 2026.** Все 4 коммита из примечания (`979dda7`,
`a689218`, `af45846`, `c6f7664`) **уже есть в `main`**, cherry-pick не нужен.
Проверка нашла, что часть пунктов ниже была помечена ✅ ошибочно. Исправлено:

### 🔴 Безопасность: токен Telegram-бота был в клиентском JS
- [x] ✅ **Исправлено в коде.** Пункты "bot token в `.env` (не в клиенте)" и
      "ContactForm через Telegram API (client-side)" противоречили друг другу. На
      деле токен был захардкожен в `ContactForm.astro`, и любой посетитель видел
      его в исходнике страницы. Теперь форма шлёт `FormData` на серверный
      `functions/api/lead.ts` (по умолчанию `<base>/api/lead`, или
      `PUBLIC_LEAD_ENDPOINT`). В `src/` и `dist/` токена больше нет.
- [ ] ⚠️ **Нужно от вас: отозвать оба токена в @BotFather (`/revoke`).** Они
      остаются в git-истории и в публичных репозиториях: `0433dff` (`…AAFuVj…`)
      и `af45846`/`c6f7664` (`…AAFh…`). Удаление из кода их не отзывает.
      Новый токен кладётся только в `TELEGRAM_BOT_TOKEN` на сервере.
- [ ] ⏸ **Форма на GitHub Pages** — там нет serverless-функций. Разверните
      `lead.ts` на Cloudflare Pages с `LEAD_ALLOWED_ORIGINS=https://<owner>.github.io`
      (CORS добавлен) и задайте repo variable `PUBLIC_LEAD_ENDPOINT`. Подробно:
      `README.md` → "GitHub Pages".

### GitHub Pages / Static Export
- [x] ✅ **`deploy.yml` исправлен.** `sed`-хак переписывал только `href="/`:
      `src=` у картинок и скриптов оставались без префикса, а при заданном `base`
      получился бы двойной префикс. Теперь workflow передаёт
      `ASTRO_SITE_URL` / `ASTRO_BASE_PATH` (берутся из имени владельца и репо,
      поэтому работает и для форка, и для `stoianov46/Forma`). Canonical,
      hreflang, sitemap и JSON-LD тоже получают правильный URL.
- [x] ✅ **Найдены и исправлены ссылки без base**, которые хак маскировал:
      карточки журнала (`journalHref`), fallback `/journal/` в Header/Footer и
      48 ссылок внутри Markdown-статей (Sätteri hast-плагин в `astro.config.mjs`).
      Проверено: сборка с `/FORMA.in.th/` дала 0 ссылок без префикса и 0 двойных.
- ✅ `peaceiris/actions-gh-pages` — оставлено как есть.

### Mobile Menu, Navigation, SEO, Content
- ✅ Подтверждено в коде: бургер-меню, переключатель языков, хлебные крошки,
  canonical/hreflang, JSON-LD `ProfessionalService`, sitemap/robots,
  OG/Twitter, 13 услуг, реальные контакты. QA проходит (linkcheck, metacheck,
  jsonldcheck: 535 блоков, browsercheck/axe).

### Документация
- [x] ✅ Добавлен корневой **`INDEX.md`**: все документы, конфиг/devops-файлы и
      env-переменные, плюс правило обновлять его при любых изменениях
      конфигурации. Ссылки на него есть в `README.md`, `docs/Index.md` и
      `AGENTS.md` (= `CLAUDE.md`).

## Итог

Полный список того, что ждёт человека (с чекбоксами): `NOTES.md` →
"Needs human review", дублируется в `PROGRESS.md` → "Open questions".

Всё, что можно было реализовать кодом — реализовано и проверено (typecheck,
build, полный QA-пак: linkcheck/metacheck/jsonldcheck/browsercheck). Что
осталось — реальные данные и решения, которые могут исходить только от вас:
контакты, юрист, боты, реальные проекты/фото, хостинг, аналитика-аккаунты,
вычитка переводов носителем. Полный список с деталями — `PROGRESS.md`.
# FORMA.in.th — improvements.md
## Задание на доработку сайта (для исполнителя / другого Claude)

Ниже — конкретные задачи, основанные на сверке живого сайта https://drandromeda.github.io/FORMA.in.th/ с реальным ТЗ репозитория: `github.com/DrAndromeda/FORMA.in.th/blob/main/proposal.md`. Этот файл — уже смёрженная версия Part 1 + Part 2 (то, что раньше присылалось как `proposal_NEW2_.md`); в самом репозитории есть редакционная заметка, что старый раздел §44 (аудит от 13.09) вынесен в отдельный `NOTES.md` как статус, а не спека. Каждая задача — с описанием, что не так, и что нужно сделать. Не меняй дизайн/компоненты без необходимости — только то, что перечислено.

---

## ЗАДАЧА 1 — [БЛОКЕР] Починить все ссылки на проекты (base path bug)
**Что не так:** на главной странице всех языковых версий (EN, RU, TH — проверить и HE) карточки в блоке "Selected work" / "Избранные работы" ведут на неправильный URL:
- EN: `drandromeda.github.io/projects/ridge-house-sri-thanu/` (должно быть `drandromeda.github.io/FORMA.in.th/projects/ridge-house-sri-thanu/`)
- RU: `drandromeda.github.io/ru/projects/...` (должно быть `drandromeda.github.io/FORMA.in.th/ru/projects/...`)
- TH: аналогично, потерян сегмент `/FORMA.in.th/`

Проверено: переход по такой ссылке → 404.

**Что сделать:**
1. Найти в коде место генерации project-карточек (вероятно, компонент вроде `ProjectCard`/`ProjectGrid`, используется на главной).
2. Найти, где формируется href — скорее всего используется относительный путь без учёта `base` из конфига (Astro `base: '/FORMA.in.th/'` или аналог), либо захардкожен путь без базового префикса.
3. Исправить так, чтобы href всегда шёл через helper, который учитывает base path и текущую локаль (см. как это сделано в CreativeLAB.in.th — там баг не воспроизводится, можно свериться с их подходом).
4. Проверить **все** места, где встречаются project-карточки — не только главную: блок "Related Projects" на страницах услуг тоже может быть затронут (страница `/services/architecture/` показывала 1 related project — проверить его ссылку тоже).
5. Проверить это для всех 4 языков (EN/RU/TH/HE) и на всех breakpoints.
6. После фикса — прогнать полный краулинг сайта (например, через `linkinator` или аналог) на предмет других 404, не только project-ссылок.

---

## ЗАДАЧА 2 — [ОТМЕНЕНА, была ошибкой] Отдельная страница `/services/` НЕ нужна
**Важная поправка:** в прошлой версии этого файла я рекомендовал создать отдельную страницу `/services/`, посчитав, что "Services" ведёт на главную по ошибке. Это неверно — реальное ТЗ прямо это требует:

> *"Do not use Home as the primary visible navigation label. The root URL `/` is the master Services landing page that explains everything the company does."*

То есть то, что пункт меню "Services" и "View all services →" ведут на `/` — **это и есть правильное поведение по спеке**, а не баг. Ничего чинить не нужно.

**Что реально нужно проверить вместо этого (из строки "Landing Strategy" в ТЗ):** *"The root Services page and all core service/category pages must be long-form, premium landing pages composed of multiple distinct useful sections, not thin directory pages."* — то есть главная должна быть развёрнутой (что она уже и есть, судя по структуре из 14 блоков). Формально проверить, что она не выглядит "тонкой" — этот пункт уже закрыт.

---

## ЗАДАЧА 3 — Создать служебные файлы из §43 ТЗ
Спека требует пакет документов для контроля качества. Сделать минимум два самых полезных для этого проекта:

1. **`URL_INTENT_MAP.md`** — таблица по каждой из ~44 страниц (EN) с колонками: URL / Page type / Primary intent / Primary keyword / Secondary keywords / Entity / Location / Internal links in/out / Schema / Canonical / Hreflang / Indexability / Status.
2. **`INTERNAL_LINKING_MAP.md`** — с явным разведением пересекающихся по смыслу услуг: **Construction vs Construction Supervision vs Technical Supervision** (это было отмечено как зона потенциальной каннибализации ещё на этапе прошлого SEO-аудита) — прописать, какой primary keyword/intent у каждой из трёх, и куда они перелинкованы друг на друга, чтобы не конкурировали в поиске.

(Остальные файлы из §43 — `AUDIT.md`, `CONTENT_QA.md`, `SEO_GEO_AUDIT.md`, `PROJECT_CONTENT_MATRIX.md`, `FINAL_QA.md`, `RELEASE_CHECKLIST.md` — по желанию, не блокер для запуска.)

---

## ЗАДАЧА 4 — Anti-AI copy pass (§18 ТЗ)
**Что не так:** в тексте встречается слово **"bespoke"** (например "Bespoke villas planned around view, breeze and privacy") — а ТЗ прямо просит избегать штампов "bespoke / seamless / tailored / timeless" как выдающих AI-генерацию.

**Что сделать:** пройтись по всем 13 страницам услуг (EN, затем синхронизировать переводы RU/TH/HE) и заменить/убрать штампованные слова, сохранив смысл. Проверить остальной список клише из §18 (repetitive sentence structure, generic claims, generic architecture clichés).

---

## ЗАДАЧА 5 — Проверить и почистить форму контактов
**Контекст:** ранее (аудит 13.09) форма зависела от Cloudflare Pages Function, которая не работает на GitHub Pages.

**Что сделать:**
1. Проверить `/contact/` — реально ли форма отправляет данные сейчас (тестовая отправка).
2. Если нет — подключить внешний сервис форм (Formspree, Getform, или webhook на свой backend), т.к. Cloudflare Functions не поддерживаются на GitHub Pages.
3. Убедиться, что есть: валидация полей, доступные лейблы (a11y), понятные ошибки, success/loading state, спам-защита (honeypot/reCAPTCHA), данные пользователя не теряются при ошибке валидации.

---

## ЗАДАЧА 6 — Ручное тестирование (нельзя проверить через код/веб-чтение)
Прогнать и зафиксировать результат по каждому пункту:
1. Мобильное бургер-меню — реальное устройство/эмулятор.
2. Dropdown-меню (Services, Locations) на touch-устройствах.
3. HE-версия — отображение и работа RTL.
4. Breakpoints 320 / 360 / 375 / 390 / 412 / 430 / 768 / 1024 / 1280 / 1440 / 1728 / 1920 — нет горизонтального скролла, нет обрезанного текста.
5. Lighthouse: Performance ≥ 90, SEO 100, A11y ≥ 95.
6. axe-core: 0 critical/serious ошибок.
7. Keyboard navigation (Tab через всё меню, focus visible, skip-to-content работает).

---

## ЗАДАЧА 7 (не блокер, на усмотрение) — Расширить Journal
Сейчас 3 статьи, покрывают 2–3 темы из 12 категорий, заданных в ТЗ (Architecture, Villa Design, Interior Design, Construction, Renovation, Materials, Tropical Architecture, Koh Phangan, Project Management, Planning, Technical, Sustainability, Design Process). Если есть ресурс — добавить статьи, закрывающие оставшиеся темы, по той же схеме (author, date, category, related services/projects/locations, internal links).

---

## ЗАДАЧА 8 — Проверить Telegram/WhatsApp бота (intake funnel)
**Что в ТЗ:** отдельный обязательный этап roadmap (шаг 5 из 10) — боты как воронка сбора заявок, с требованием "**13 услуг × 5 локаций × 4 языка — 0 dead ends**" в тестировании. Сейчас на сайте есть только прямые ссылки WhatsApp/Telegram в футере (`wa.me/...`, `t.me/formaisland_bot`) — непонятно, реализован ли у бота сценарий intake funnel (язык → услуга → локация → контакт) или это просто ссылки на чат.

**Что сделать:** уточнить у бота `@formaisland_bot`, реализована ли эта логика. Если нет — это отдельный крупный этап, не просто контент-правка.

## ЗАДАЧА 9 — Проверить Eco Construction и Concrete Construction Turnkey отдельно
**Что в ТЗ:** прямо указано как обязательный пункт (P0): *"Include Eco Construction and Concrete Construction Turnkey as dedicated services with full landing pages in all four languages."*

**Статус:** обе услуги присутствуют в меню на EN/RU/TH (подтверждено). **Проверить:** есть ли у них полноценная landing-структура (как у `/services/architecture/`: direct answer, scope, process, deliverables, pricing, FAQ, related), а не просто урезанная страница — и что они переведены на все 4 языка, включая HE.

## ЗАДАЧА 10 — Технический стек: static-first, без CMS
**Что в ТЗ:** первая продакшн-версия должна быть статическим сайтом без CMS/admin/базы данных (стек — любой статический: Astro, Vite и т.п., но SEO-контент обязан быть в crawlable HTML, не зависеть от client-side JS). Архитектурное решение должно быть задокументировано в README.
**Что сделать:** проверить, что README в репозитории объясняет выбор стека, и что ключевой SEO-контент не рендерится только через JS (актуально для §5 "Direct Answer" блоков — они должны быть в исходном HTML, не подгружаться скриптом).

---

## Что уже сделано и трогать не нужно
- Позиционирование бренда, единое написание "FORMA" — ок.
- Структура и наполнение страницы `/services/architecture/` (эталон для остальных 12 услуг) — соответствует ТЗ полностью.
- Хлебные крошки — исправлены, ведут куда надо.
- Таблицы цен на страницах услуг — сделаны корректно (относительные диапазоны, не выдуманные фиксированные цифры).
- Реальные контакты (email/WhatsApp/Telegram) вместо заглушек.
- RU и TH переводы — полные, не только заголовки.
- Canonical/hreflang в head — присутствуют.

---
---

# ОБНОВЛЕНИЕ от 28.10.2026 — статус ТЗ + новые решения владельца
*(добавлено ниже существующего содержимого; ничего выше не удалено. Источник ТЗ: `github.com/stoianov46/Forma/blob/main/proposal.md` — 1906 строк, тот же текст, что и в `DrAndromeda/FORMA.in.th`: Part 1 + Part 2 + таблица DeepSeek + §50.)*

**Ограничение этой проверки:** `NOTES.md`, `PROGRESS.md` и страницы `/locations/*` сегодня открыть не удалось (инструмент чтения не пустил на эти URL). Живой сайт ранее проверялся только на `drandromeda.github.io/FORMA.in.th/` (главная EN/RU/TH + `/services/architecture/`). Сборка `stoianov46.github.io/Forma/` не проверялась — если это основная, статусы ниже надо перепроверить на ней.

---

## A. РЕШЕНИЯ ВЛАДЕЛЬЦА (имеют приоритет над текстом ТЗ)

| № | Решение | Что переопределяет в ТЗ |
|---|---|---|
| D1 | Убрать кнопку **«Start a Project»** из **хедера** и **футера** на всех страницах, во всех 4 языках, включая мобильное меню | §3 MENU «Header CTA», «Mobile menu… Start a Project CTA»; §4 IA «Header CTA»; §19 Luxury Conversion System (в части хедера/футера) |
| D2 | В меню «Locations» оставить **одну группу «Islands»** с четырьмя ссылками: Koh Phangan, Koh Samui, Koh Tao, Bali (URL: `/locations/koh-phangan/`, `/locations/koh-samui/`, `/locations/koh-tao/`, `/locations/bali/`) | §3 MENU «Locations submenu» (Thong Sala, Haad Rin, Sri Thanu, Chaloklum, Baan Tai, Haad Yao, Haad Salad); §4 IA строки locations submenu |
| D3 | Дизайн-этап (§50 «три варианта главной», `/v1/ /v2/ /v3/`) считать **завершённым** — выбранный вариант остаётся, остальные удалить | §50 инструкция «после выбора → удалить остальные» |
| D4 | На **каждой** странице обязательны: богатый SEO-текст, блок прямого ответа (featured snippet), микроразметка JSON-LD, таблица цен | усиливает §5/§14/§30/§32 |

**Допущения, которые я принял (поправь, если неверно):**
1. В списке ты написал «три локации», но перечислил **четыре** (Phangan, Samui, Tao, Bali) — это совпадает с ТЗ («LOCATIONS: Koh Phangan, Koh Samui, Koh Tao, Bali»). Беру четыре.
2. D1 касается только хедера и футера. Кнопки «Start a Project» в **теле страниц** (hero, финальный CTA-блок, страницы услуг) остаются — иначе у страниц пропадёт следующий шаг (§41 «No dead ends»). В хедере остаётся ссылка «Contact» (она нужна по ТЗ как вторичный контакт).
3. Страницы районов (Thong Sala, Haad Rin, Sri Thanu, Chaloklum…) убираются **из меню и футера**. Сами страницы либо оставить как внутренние (со ссылкой с `/locations/koh-phangan/`), либо удалить — решение за тобой (см. раздел D).

---

## B. СТАТУС ТЗ

### ✅ Выполнено (подтверждено на `drandromeda.github.io/FORMA.in.th/`)
- Корень `/` = мастер-страница услуг, «Home» в меню нет (§24 ROOT PAGE) — отдельный `/services/` создавать нельзя
- Меню начинается с Services (§25), все 13 услуг доступны
- Страница `/services/architecture/`: H1 → прямой ответ → scope → process → deliverables → таблица «Indicative investment» (относительные диапазоны, без выдуманных цифр) → related projects → FAQ → related services → CTA
- Хлебные крошки `Home / Services / …` без дублирования
- Реальные контакты (email / WhatsApp / Telegram) вместо заглушек
- RU и TH главной переведены полностью; canonical и hreflang в `<head>`
- Eco Construction и Concrete Construction присутствуют в меню (EN/RU/TH)
- Нет выдуманных наград, клиентов, цен

### ❌ Не выполнено / баг
- **Ссылки на проекты ведут в 404** (потерян сегмент `/FORMA.in.th/` в href карточек «Selected work», EN/RU/TH). Блокер
- Служебные документы §43 (`URL_INTENT_MAP.md`, `INTERNAL_LINKING_MAP.md`, `CONTENT_QA.md`, `SEO_GEO_AUDIT.md`, `PROJECT_CONTENT_MATRIX.md`, `FINAL_QA.md`, `RELEASE_CHECKLIST.md`) не найдены
- Слово «bespoke» в копирайте (запрещённый штамп, §18 и список в DeepSeek-таблице §8 COPY)
- Журнал: 3 статьи из 12 категорий; нет автора/дат обновления на карточках

### 🔍 Не проверено (нужен ручной/инструментальный прогон)
Форма контактов (реально отправляет?), мобильное меню, HE/RTL, Lighthouse/axe, схема на каждой странице, sitemap/robots, 4 страницы `/locations/*`, страница About (команда), cookie-баннер, юридические страницы, `/llms.txt`, боты, аналитика, `/v1 /v2 /v3`.

### ⛔ Не сделано из «нового» в ТЗ (нет признаков на сайте)
| Пункт ТЗ | Что нужно |
|---|---|
| §11 GEO: `/llms.txt`, разрешение GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot в robots.txt | создать |
| §17 Compliance: cookie-баннер Accept/Reject/Settings (GA/Meta блокируются до согласия), Privacy, Terms, Cookies, PDPA, Accessibility statement | создать страницы + баннер |
| §18 E-E-A-T: `/editorial-policy/`, `/about/authors/[slug]/`, Person schema, `dateModified` в UI и схеме | создать (после данных от тебя) |
| §16 Analytics: события `cta_click, form_start, form_submit, whatsapp_click, telegram_click, language_switch, project_view …`, Google Search Console, Yandex Webmaster + Metrica | подключить |
| §12 Perf: hero ≤ 250 KB, прочие изображения ≤ 150 KB, p75 mobile CWV | замерить |
| §20 Tests/CI: проверка запрещённых фраз (0 совпадений), ровно 1 H1, title ≤ 70 симв., meta 150–200 симв., 40–60 слов в верхнем блоке, 6+ FAQ, `tsc --noEmit`, link-check | добавить в CI |
| §5 DESIGN: CSS-only «living background» (градиент 30–60 с, без JS), max 2 анимации в viewport | проверить/добавить |
| §8 COPY: объёмы текста (Home 800–1400; Architecture/Villa/Interior/Renovation 1000–1800; Construction/Turnkey 1200–2000; PM/Supervision/Landscape 900–1600; About 900–1500; Process 900–1600; Locations 700–1200; Contact 500–900) | сверить каждую страницу |
| Боты Telegram/WhatsApp: воронка Язык → Услуга → Локация → Тип → Описание → Бюджет → Сроки → Файлы → Контакт → Review → Submit → Handoff; 13 услуг × 5 локаций (+Other) × 4 языка | проверить `@formaisland_bot`, реализовать при отсутствии |

---

## C. ЗАДАЧИ ИСПОЛНИТЕЛЮ (новые, по твоим указаниям)

### ЗАДАЧА 11 — Убрать «Start a Project» из хедера и футера (D1)
1. Удалить кнопку из компонента Header (десктоп, sticky-состояние после скролла, прозрачное состояние над hero) и из мобильного drawer.
2. Удалить из компонента Footer (все 4 локали, RTL-версия тоже).
3. В хедере оставить: логотип, пункты меню, переключатель языка, ссылку «Contact». Проверить, что справа не осталась пустая «дырка» (выровнять сетку, на RTL — зеркально).
4. Убедиться, что мобильная шапка по-прежнему имеет доступный контакт в один тап (ТЗ §4 IA «Reachable in 1 interaction») — иконка/ссылка «Contact».
5. Обновить переводы: удалить неиспользуемые ключи (`startProject` в header/footer) в EN/RU/TH/HE, чтобы не осталось мёртвых строк.
6. Проверка: `grep -ri "start a project"` по собранному `dist/` — совпадения допустимы **только** в теле страниц (hero/final CTA), не в `<header>` и `<footer>`.

### ЗАДАЧА 12 — Меню и футер «Locations» → группа «Islands» (D2)
1. Dropdown/mega-menu «Locations»: заголовок группы **Islands** (RU: «Острова», TH: «เกาะ», HE: «איים»), внутри ровно четыре ссылки:
   - Koh Phangan → `/locations/koh-phangan/`
   - Koh Samui → `/locations/koh-samui/`
   - Koh Tao → `/locations/koh-tao/`
   - Bali → `/locations/bali/`
2. То же в мобильном аккордеоне «Locations» и в блоке «Locations» футера. Никаких Thong Sala / Haad Rin / Sri Thanu / Chaloklum / Baan Tai / Haad Yao / Haad Salad в навигации.
3. Блок «Locations» на главной: показывать те же четыре острова, а не районы Пангана.
4. Все четыре ссылки должны вести на **существующие** страницы с правильным base path (`/FORMA.in.th/locations/…` для этого деплоя) и во всех 4 языках (`/ru/locations/…`, `/th/…`, `/he/…`).
5. Сквозной апдейт: хлебные крошки, related locations на страницах услуг и проектов, sitemap, hreflang, `INTERNAL_LINKING_MAP.md` — только четыре острова (+ районы, если страницы остаются, — как внутренние ссылки со страницы Koh Phangan).
6. Каждая из четырёх страниц — уникальный локальный контент (не копия с заменой названия, §14): logistics, климат, доступ, особенности стройки, релевантные проекты, FAQ 6–10, прямой ответ, таблица цен, JSON-LD.

### ЗАДАЧА 13 — Сквозной аудит «каждая страница» (D4)
Прогнать **каждый индексируемый URL × 4 языка** и заполнить матрицу (формат §34 QA MATRIX). Страница не считается готовой, пока все четыре признака не ✅:

| Признак | Критерий | Тип страницы |
|---|---|---|
| **Красивый SEO-текст** | объём по §8 COPY; короткие/средние абзацы, подзаголовки, списки, таблицы, callout; нет штампов (bespoke, seamless, tailored, timeless, «we turn dreams into reality», world-class, #1 без доказательств); нет keyword stuffing | все |
| **Featured snippet** | в первом блоке после hero — самодостаточный ответ **40–60 слов**, уникальный на странице, без дублирования title/meta; не подписывать как «Google Featured Snippet» | Home, 13 услуг, 4 локации, Process, Projects, About |
| **Микроразметка JSON-LD** | в исходном HTML, валидна в Rich Results Test, 0 ошибок (карта ниже) | все |
| **Таблица цен** | видимая таблица (правила ниже) | все коммерческие страницы |

**Карта схем по типам страниц** (только то, что фактически подтверждается видимым контентом):
| Страница | JSON-LD |
|---|---|
| Home `/` | Organization (+ `sameAs`, `knowsAbout`, `areaServed`, `serviceType`), WebSite, WebPage, ItemList услуг, FAQPage |
| 13 услуг | Service (`provider`, `areaServed`), WebPage, BreadcrumbList, FAQPage |
| 4 острова | WebPage, BreadcrumbList, FAQPage, Place/`areaServed`; `LocalBusiness`/`ProfessionalService` — только если есть реальный адрес |
| Projects index / project | CollectionPage / CreativeWork, ImageObject, BreadcrumbList |
| Process, About | WebPage, BreadcrumbList; About — Organization/Person только при реальных данных команды |
| Journal / статья | Blog / Article (автор, `datePublished`, `dateModified`), BreadcrumbList |
| Contact | ContactPage, Organization (реальные NAP) |

**Запрещено в схеме:** выдуманные рейтинги, отзывы, цены (`Offer`/`price`), награды. Таблица цен видимая, но `Offer` с цифрами в JSON-LD не добавлять без подтверждённых цен.

**Таблица цен — правила (важно, конфликт с ТЗ):** ТЗ одновременно требует таблицу «Budget / Example costs» и **запрещает выдумывать цены** (§5 COPYWRITING «Pricing guidance», §32, §0 Truth rule). Поэтому:
1. Если подтверждённых цифр нет — таблица делается в формате, уже принятом на `/services/architecture/`: сценарий / что входит / **относительный диапазон** (Base · 1.5–2.5× · 3×+) / от чего зависит, плюс строка-оговорка «indicative» и CTA «обсудить проект». Это допустимо по ТЗ.
2. Если Ким присылает проверенные цифры — вставить их в тот же шаблон с пометкой «indicative, from THB …» и датой актуализации.
3. Любое число без источника — маркер `[[VERIFY: …]]` в исходниках и пункт в `NOTES.md`.
4. Содержимое таблицы по типу страницы: **услуги** — варианты объёма; **острова** — типы проектов на этом острове и факторы цены (логистика, рельеф, доступ); **Home** — сводная таблица «услуга → как формируется стоимость»; **Process** — «этап → за что платит клиент»; **Projects** — «тип проекта → факторы»; **About / Contact / Journal** — компактная таблица «Как формируется стоимость» (3–5 строк) со ссылкой на услуги.
5. Таблицы должны быть адаптивны на 320 px (горизонтальный скролл **внутри** контейнера `overflow-x:auto`, без скролла страницы) и корректно зеркалиться в HE (RTL).

### ЗАДАЧА 14 — Закрыть дизайн-этап (D3)
1. Проверить, остались ли маршруты `/v1/`, `/v2/`, `/v3/`; если да — оставить только выбранный вариант, остальные удалить вместе с компонентами и картинками (иначе дубли в индексе и cannibalization).
2. Удалить из sitemap и добавить в robots/redirects при необходимости.
3. Зафиксировать выбор в `NOTES.md`.

### ЗАДАЧА 15 — Недостающие обязательные системы (из раздела B ⛔)
`/llms.txt`, robots для AI-ботов, cookie-баннер + юридические страницы, аналитика + Search Console/Yandex, `/editorial-policy/`, автор-страницы, CI-тесты запрещённых фраз и метаданных. Порядок: юридические страницы и cookie-баннер → `llms.txt`/robots → аналитика → CI → E-E-A-T (после данных от Кима).

---

## D. ЧТО НУЖНО ОТ КИМА (без этого исполнитель не может закрыть пункты, не выдумывая факты)
1. **Подтверждённые цены** (или разрешение остаться на относительных диапазонах) — для таблиц на всех страницах.
2. **Страницы районов** (Thong Sala, Haad Rin, Sri Thanu, Chaloklum…) — оставить как внутренние или удалить?
3. **Подтверждение допущений** из раздела A (четыре острова; D1 касается только хедера/футера; «Contact» в хедере остаётся).
4. **Какая сборка основная:** `drandromeda.github.io/FORMA.in.th/` или `stoianov46.github.io/Forma/` — аудит выше сделан по первой.
5. **Реальные данные команды** (имена, роли, фото, опыт) — для About, авторов, Person schema. Без них раздел остаётся без выдуманных людей.
6. **Реальные проекты:** факты, даты, материалы, фото с правами — для страниц проектов (§8).
7. **Юр. данные:** название юрлица, адрес, телефон, email для Contact, Privacy, Organization schema и NAP.
8. **Аккаунты:** Instagram / YouTube / TikTok / LinkedIn / Google Business Profile — для `sameAs`; доступ к Search Console и Yandex Webmaster.
9. **Боты:** токен Telegram-бота, доступ к WhatsApp Business/Cloud API, куда складывать заявки (CRM/почта/чат).
10. **Фото:** финальные фотографии или разрешение временно использовать лицензированные.

---

## E. БЛОК ДЛЯ ВСТАВКИ В `proposal.md` / `NOTES.md` (добавить в конец, ничего не удаляя)

```markdown
## DECISION LOG — 2026-10-28 (owner decisions; supersede earlier wording)

- D1. The "Start a Project" button is removed from the site header and footer on all pages and in all languages (including the mobile drawer). In-page CTAs (hero, final CTA) stay. Header keeps a "Contact" link.
  Supersedes: §3 MENU Header CTA / Mobile menu, §4 IA Header CTA, §19 (header/footer part).
- D2. Locations navigation (header, mobile, footer, homepage block) shows a single group "Islands": Koh Phangan, Koh Samui, Koh Tao, Bali.
  District pages (Thong Sala, Haad Rin, Sri Thanu, Chaloklum, Baan Tai, Haad Yao, Haad Salad) are not in navigation.
  Supersedes: §3 MENU Locations submenu, §4 IA locations submenu.
- D3. Design phase (§50 three homepage variants) is complete; only the selected variant remains.
- D4. Every page requires: editorial SEO copy, a 40–60 word direct-answer block, valid JSON-LD, and a visible price table.
  Price tables use verified figures only; otherwise relative bands with explicit "indicative" qualifiers. No Offer/price in JSON-LD without verified prices.
```
НОВОЕ ТЗ ДЛЯ ИСПОЛНИТЕЛЯ (Claude) — FORMA.in.th и CreativeLAB.in.th

Версия от 28.10.2026. Сводит в один документ: старое ТЗ (proposal.md обоих репозиториев), всё, что уже сделано, всё, что не сделано, новые решения владельца и то, что нужно получить от владельца.

Интерпретация запроса: «Romance» понят как «Claude» (исполнитель). Если имелся в виду другой сайт или адресат — документ нужно перенацелить, структура останется той же.

0. ПРАВИЛА РАБОТЫ (обязательны)
Ничего не удалять из старого ТЗ. Если требования пересекаются — действует более строгое. Исключения только в разделе 2 (решения владельца).
Не выдумывать факты: клиентов, награды, отзывы, команду, годы опыта, проекты, сертификаты. Исключение — цены: по решению владельца D6 примерные цены генерируются по Приложению P (с пометкой «indicative example»). Остальное неизвестное = структурно законченный блок без цифр + пометка [[VERIFY: что именно]] в исходниках и строка в NOTES.md.
Не блокироваться вопросами. Где данных нет — выбрать самый премиальный, технически корректный и SEO-безопасный вариант, записать допущение в NOTES.md. Вопросы владельцу — только из раздела 5.
Не менять дизайн-систему, компоненты и архитектуру, кроме того, что прямо перечислено в задачах.
Страница не считается готовой, пока не пройдены: тексты, вёрстка, мобильная версия, ссылки, SEO, схема, скорость, доступность, 4 языка.
Порядок работы: задачи ниже идут по приоритету. Проект должен оставаться запускаемым после каждой задачи. После каждой — короткий отчёт: что сделано, что проверено, что осталось.
Язык и стиль копирайта: тихая роскошь, конкретика. Запрещены штампы: bespoke, seamless, tailored, timeless, unparalleled, one-stop solution, world-class, state-of-the-art, cutting-edge, «we turn dreams into reality», «take your business to the next level», «best / #1» без доказательств.
1. ИСТОЧНИКИ ИСТИНЫ
Что	Где
ТЗ FORMA (Part 1 + Part 2 + таблица DeepSeek + §50), 1906 строк	github.com/DrAndromeda/FORMA.in.th/blob/main/proposal.md и идентичная копия github.com/stoianov46/Forma/blob/main/proposal.md
Статус и баги FORMA	NOTES.md («Critical audit findings 13 Sep 2026»), PROGRESS.md в репозитории
ТЗ CreativeLAB	github.com/DrAndromeda/CreativeLAB.in.th/blob/main/proposal.md
Живые сайты	drandromeda.github.io/FORMA.in.th/, stoianov46.github.io/Forma/ (Astro-сборка), drandromeda.github.io/CreativeLAB.in.th/
Этот файл	решения владельца (раздел 2) имеют приоритет над старым текстом
ЧАСТЬ A — FORMA.in.th (архитектурное бюро, Koh Phangan)
2. РЕШЕНИЯ ВЛАДЕЛЬЦА (приоритет над старым ТЗ)
№	Решение	Переопределяет
D1	Кнопка «Start a Project» удаляется из хедера и футера на всех страницах, во всех 4 языках, включая мобильное меню. В теле страниц (hero, финальный CTA-блок, страницы услуг) остаётся. В хедере остаётся ссылка «Contact».	§3 MENU (Header CTA, Mobile menu), §4 IA (Header CTA), §19 (в части хедера/футера)
D2	Меню «Locations» (десктоп, мобильный аккордеон, футер, блок на главной) = одна группа «Islands» из четырёх ссылок: Koh Phangan, Koh Samui, Koh Tao, Bali (/locations/koh-phangan/, /locations/koh-samui/, /locations/koh-tao/, /locations/bali/). Районы (Thong Sala, Haad Rin, Sri Thanu, Chaloklum, Baan Tai, Haad Yao, Haad Salad) — не в навигации.	§3 MENU Locations submenu, §4 IA
D3	Дизайн-этап (§50, три варианта главной /v1 /v2 /v3) завершён; остаётся выбранный вариант, остальные удалить.	§50
D4	На каждой странице обязательны: богатый SEO-текст, блок прямого ответа (featured snippet, 40–60 слов), микроразметка JSON-LD, видимая таблица цен.	усиливает §5, §14, §30, §32
D5	Корень / = мастер-страница услуг, «Home» в меню нет, отдельный /services/ не создавать (уже в ТЗ: §24 ROOT PAGE).	—
D6	Таблицы цен: примерные цены разрешено генерировать для услуг, немного выше рынка (ориентир +10–20% к типичным ценам острова), на очень высоком качественном уровне. Цифры берутся из Приложения P. Страницы — длинные, насыщенные, с соблюдением всех требований ТЗ по дизайну, тексту и SEO (Приложение Q).	§5 «Pricing guidance», §32 «Pricing examples», §0 «Truth rule» (в части цен; требование явной пометки «indicative» сохраняется)

Допущения по умолчанию (если владелец не ответит): четыре острова, а не три; D1 касается только хедера и футера; страницы районов остаются внутренними страницами, доступными только со страницы Koh Phangan.

3. СТАТУС FORMA
✅ Сделано (подтверждено на drandromeda.github.io/FORMA.in.th/; трогать не нужно)
Корень = мастер-страница услуг; меню начинается с Services; все 13 услуг доступны.
/services/architecture/ — эталонная структура: H1 → прямой ответ → scope → process → deliverables → «Indicative investment» (относительные диапазоны, без выдуманных цифр) → related projects → FAQ → related services → CTA.
Хлебные крошки исправлены. Контакты реальные (email, WhatsApp, Telegram). RU и TH главной переведены полностью. Canonical и hreflang в <head>.
Eco Construction и Concrete Construction есть в меню (EN/RU/TH).
Нет выдуманных наград, клиентов, цен.
❌ Не сделано / найден баг
Ссылки на карточки проектов ведут в 404 (потерян сегмент /FORMA.in.th/; EN, RU, TH).
Служебные документы §43 отсутствуют.
Штамп «bespoke» в копирайте.
Журнал: 3 статьи из 12 категорий, нет автора и даты обновления на карточках.
Нет признаков: /llms.txt, robots для AI-ботов, cookie-баннер, Privacy/Terms/Cookies/PDPA, /editorial-policy/, автор-страницы, аналитика, CI-тесты, измерение бюджетов изображений.
🔍 Не проверено (проверить в ходе работ)

Форма контактов (реально отправляет?), мобильное меню, HE/RTL, Lighthouse/axe, JSON-LD на каждой странице, sitemap/robots, четыре /locations/*, About (команда), боты @formaisland_bot, /v1 /v2 /v3, Eco и Concrete на всех 4 языках, какая из двух сборок основная.

4. ЗАДАЧИ FORMA (по приоритету)
F1 — [БЛОКЕР] Починить ссылки на проекты (404)
Проблема: href карточек «Selected work» теряют базовый путь: drandromeda.github.io/projects/... вместо drandromeda.github.io/FORMA.in.th/projects/... (так же /ru/, /th/, /he/).
Сделать: найти компонент карточки проекта; формировать href через единый helper, учитывающий base из конфига и текущую локаль; проверить все места с project-карточками (главная, Related Projects на страницах услуг, Projects, локации, Journal); прогнать краулер (linkinator или аналог) по всему сайту.
Готово, когда: 0 битых и 0 осиротевших ссылок на всех 4 языках.
F2 — Убрать «Start a Project» из хедера и футера (D1)
Удалить из Header (десктоп, прозрачное и sticky-состояния) и из мобильного drawer; удалить из Footer (все локали, RTL тоже).
В хедере оставить логотип, меню, переключатель языка, ссылку «Contact». Выровнять сетку, на RTL — зеркально; убрать «дыру» справа.
Мобильная шапка сохраняет контакт в один тап (иконка/ссылка «Contact»).
Удалить неиспользуемые ключи переводов в EN/RU/TH/HE.
Готово, когда: grep -ri "start a project" по dist/ находит совпадения только в теле страниц, не в <header> и <footer>; аналогично для RU/TH/HE строк.
F3 — Навигация «Locations» → группа «Islands» (D2)
Заголовок группы: Islands / Острова / เกาะ / איים. Внутри ровно четыре ссылки (адреса в D2). То же в мобильном аккордеоне, футере и блоке «Locations» на главной.
Все ссылки ведут на существующие страницы с верным base path на 4 языках.
Обновить хлебные крошки, related locations, sitemap, hreflang, INTERNAL_LINKING_MAP.md — только четыре острова.
Каждая из четырёх страниц — уникальный локальный контент (логистика, климат, доступ, особенности стройки, релевантные проекты), без шаблонной замены названия; FAQ 6–10; прямой ответ; таблица цен; JSON-LD.
Готово, когда: в навигации нет районов; четыре страницы отдают 200 на всех языках; матч с ботом: список локаций = Koh Phangan, Koh Samui, Koh Tao, Bali, Other.
F4 — Сквозной аудит «каждая страница» (D4)

Матрица URL × EN/RU/TH/HE (формат §34 QA MATRIX, статус PASS/WARN/FAIL). Страница готова, когда все четыре признака в порядке:

Признак	Критерий
Красивый SEO-текст	Объём по §8 COPY: Home 800–1400; Architecture, Villa Design, Interior, Renovation 1000–1800; Construction, Turnkey 1200–2000; PM, Supervision, Landscape 900–1600; About 900–1500; Process 900–1600; Locations 700–1200; Contact 500–900. Короткие и средние абзацы, подзаголовки, списки, таблицы; нет штампов; нет keyword stuffing; без «воды» ради объёма.
Featured snippet	Сразу после hero самодостаточный ответ 40–60 слов, уникальный на странице, не дублирует title/meta; не называть его гарантированным Google snippet. Обязателен на Home, 13 услугах, 4 островах, Process, Projects, About.
JSON-LD	В исходном HTML, 0 ошибок в Rich Results Test; только то, что подтверждено видимым контентом (карта ниже).
Таблица цен	Видимая таблица на каждой коммерческой странице (правила ниже).

Карта схем:

Страница	JSON-LD
Home	Organization (sameAs, knowsAbout, areaServed, serviceType), WebSite, WebPage, ItemList услуг, FAQPage
13 услуг	Service (provider, areaServed), WebPage, BreadcrumbList, FAQPage
4 острова	WebPage, BreadcrumbList, FAQPage, Place/areaServed; LocalBusiness/ProfessionalService только при реальном адресе
Projects, проект	CollectionPage, CreativeWork, ImageObject, BreadcrumbList
Process, About	WebPage, BreadcrumbList; Person/Organization только при реальных данных
Journal, статья	Blog, Article (автор, datePublished, dateModified), BreadcrumbList
Contact	ContactPage, Organization (реальные NAP)

Запрещено в JSON-LD: выдуманные рейтинги, отзывы, награды, цены (Offer/price) без подтверждённых данных.

Таблицы цен — правила (обновлено решением D6; цифры и шаблоны — в Приложении P):

Используются примерные цены в THB из Приложения P: сценарий / что входит / пример цены / от чего зависит; под таблицей обязательная строка «Indicative example, 2026. Excl. VAT, land, government fees. Final quote after site review»; CTA «Discuss Your Site». Прежний формат относительных диапазонов (Base · 1.5–2.5×) допустим как дополнительная колонка «что сдвигает цену».
Когда владелец пришлёт реальные цены — заменить примерные в тех же ячейках, пометку «example» убрать, поставить дату актуализации. В исходниках примерные цены помечать маркером [[EXAMPLE-PRICE]] для быстрой замены.
Все цифры хранятся в одном файле данных (pricing.json/pricing.ts), страницы читают их оттуда; на всех 4 языках цифры идентичны (меняются только подписи). Список [[EXAMPLE-PRICE]] — в NOTES.md.
Содержимое по типам: услуги — варианты объёма; острова — типы проектов и факторы цены (логистика, рельеф, доступ); Home — «услуга → как формируется стоимость»; Process — «этап → за что платит клиент»; Projects — «тип проекта → факторы»; About, Contact, Journal — компактная таблица «Как формируется стоимость» (3–5 строк).
На 320 px таблица скроллится внутри контейнера (overflow-x:auto), страница не скроллится по горизонтали; в HE зеркалится корректно.
F5 — Закрыть дизайн-этап (D3)

Проверить маршруты /v1 /v2 /v3; оставить только выбранный вариант, остальные удалить вместе с компонентами и картинками; убрать из sitemap, при необходимости редиректы; зафиксировать выбор в NOTES.md.

F6 — Контактная форма и боты
Форма /contact/: протестировать реальную отправку. Cloudflare Pages Functions на GitHub Pages не работают → подключить внешний сервис форм или собственный webhook. Нужны: валидация, доступные подписи, понятные ошибки, состояния loading и success, защита от спама, сохранение введённых данных при ошибке.
Боты Telegram и WhatsApp (официальные API): воронка Язык → Услуга → Локация → Тип проекта → Описание → Бюджет (опц.) → Сроки (опц.) → Файлы → Контакт → Проверка/Правка → Отправка → Передача человеку. Услуг ровно 13, локаций 5 (4 острова + Other), 4 языка, предвыбор услуги/локации с контекстной страницы, сохранение UTM, валидация вебхуков, rate-limit, валидация загрузок.
Данные заявки: timestamp, канал, язык, услуга, локация, тип проекта, описание, бюджет, сроки, имя/контакт, вложения, source URL/campaign.
Требует доступов от владельца (раздел 5).
F7 — Недостающие обязательные системы

Порядок: юридические страницы (Privacy, Terms, Cookies, PDPA, Accessibility) и cookie-баннер Accept/Reject/Settings (GA и Meta блокируются до согласия) → /llms.txt + robots.txt с разрешением GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot → аналитика (события: cta_click, form_start, form_submit, form_error, bot_start, bot_submit, whatsapp_click, telegram_click, phone_click, email_click, language_switch, project_view, article_read_75) + Search Console + Yandex Webmaster/Metrica → CI-проверки (запрещённые фразы = 0, ровно один H1, title ≤ 70 символов, meta 150–200, 40–60 слов в верхнем блоке, 6+ уникальных FAQ на коммерческих страницах, link-check, tsc --noEmit) → E-E-A-T (/editorial-policy/, /about/authors/[slug]/, Person schema, dateModified) только на реальных данных.

F8 — Контент и копирайт
Анти-AI проход по 13 услугам и их переводам (RU/TH/HE синхронно): убрать «bespoke» и прочие штампы.
Eco Construction и Concrete Construction Turnkey: полноценные landing-страницы (прямой ответ, принципы/scope, процесс, таблица, FAQ, CTA, схема) на всех 4 языках; без greenwashing и выдуманных инженерных регалий.
Журнал: статьи по оставшимся категориям (Architecture, Villa Design, Interior, Construction, Renovation, Materials, Tropical Architecture, Koh Phangan, Project Management, Planning, Technical, Sustainability, Design Process) — автор, дата, дата обновления, связанные услуги/проекты/локации, не менее 2 авторитетных источников; темп 2 статьи в месяц.
Страница проекта по шаблону §8 (21 блок), без выдуманных бюджетов, дат, материалов, клиентов; неизвестное остаётся неизвестным.
F9 — Служебные документы (§43)

Создать: URL_INTENT_MAP.md (URL, тип, primary intent, keyword, secondary, entity, location, ссылки in/out, schema, canonical, hreflang, indexability, status), INTERNAL_LINKING_MAP.md (отдельно развести Construction / Construction Supervision / Technical Supervision, чтобы не конкурировали), CONTENT_QA.md, SEO_GEO_AUDIT.md, PROJECT_CONTENT_MATRIX.md, AUDIT.md, IMPLEMENTATION_NOTES.md, FINAL_QA.md, RELEASE_CHECKLIST.md, NOTES.md со списком всех [[VERIFY]].

F10 — Инструментальное QA (в самом конце)

Lighthouse (Performance ≥ 90, SEO 100, A11y ≥ 95), axe-core (0 critical/serious), CWV (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1), бюджет изображений (hero ≤ 250 KB, остальные ≤ 150 KB), брейкпоинты 320/360/375/390/412/430/768/1024/1280/1440/1728/1920, клавиатурная навигация, мобильное меню и dropdown на touch, HE/RTL отдельным прогоном (навигация, крошки, сетки, стрелки, формы, числа, URL, телефоны), браузеры Chrome/Safari/Firefox/Edge, консоль и сеть без ошибок, 404 и редиректы, валидация sitemap, robots, canonical, hreflang, схемы. Чек-лист §42 «Final release gates» закрывается целиком.

ЧАСТЬ B — CreativeLAB.in.th (креативное/рекламное агентство)

Источник: proposal.md репозитория DrAndromeda/CreativeLAB.in.th. Живая страница-эталон: /advertising/meta-ads (структура, цены с диапазонами, FAQ, related, CTA, хлебные крошки — всё по стандарту; бага base path нет).

✅ Сделано

Структура страницы услуги по шаблону (Hero → прямой ответ → состав → польза → процесс → цены → сегменты → FAQ → related → CTA); корректные хлебные крошки и внутренние ссылки; меню по поисковым интентам; цены диапазонами с оговоркой, без выдуманных цифр.

❌ / 🔍 Не сделано или не проверено
Мультиязычность EN/RU/TH/HE — высший приоритет по самому ТЗ («выше всех остальных»). Переключателя языка нет, сайт, по всему видно, только на английском.
Реестр URL P0/P1/P2 (/advertising/…, /social-media/…, /villas-real-estate/…, /food-restaurants/…, /business-local-presence/…, /websites-digital/…, /video-production/…, /branding-creative/…, /portfolio/, /case-studies/, /about/, /contact/, /journal/) не сверен с фактом. Использовать структуру /advertising/… без префикса /services/ (противоречие внутри ТЗ решено в пользу неё).
Нет страниц локаций /locations/koh-phangan/, /koh-samui/, /koh-tao/ с уникальным контентом.
Нет llms.txt и llms-full.txt.
Telegram/WhatsApp-боты как воронка заявок: статус неизвестен.
Объём контента по Content Depth Rule: pillar 1500+ слов, FAQ 8–12; spoke 800+, FAQ 6–10; кейс 500+; локация 500+, FAQ 4–6.
Анти-штамп аудит («we bring your vision to life», «take your business to the next level», «unparalleled», «one-stop solution»).
Три зоны каннибализации: restaurant website (/food-restaurants/website/ и /websites-digital/restaurant-website/), drone/FPV (/villas-real-estate/drone/ и /video-production/drone-video/), menu design (/food-restaurants/menu-design/ и /branding-creative/menu-design/) — развести по интентам или канонизировать.
/portfolio/ и /case-studies/: реальное наполнение или структурные заготовки без выдуманных цифр.
QA: Lighthouse, axe-core, CWV, брейкпоинты, Rich Results, формы.
Задачи CreativeLAB по приоритету

C1 — 4 языка для всех страниц (языковой селектор в шапке и мобильном меню, сохранение пути; полный профессиональный перевод body, title/description/H1, canonical + hreflang на en/ru/th/he/x-default, JSON-LD, OG, alt, меню, крошки, CTA; HE с настоящим RTL; без машинного перевода). C2 — сверка и создание отсутствующих P0-страниц. C3 — три страницы локаций. C4 — разведение каннибализации. C5 — llms.txt, llms-full.txt. C6 — проход по объёмам и штампам. C7 — портфолио и кейсы. C8 — боты (если ещё нет). C9 — QA.

5. ЧТО НУЖНО ОТ ВЛАДЕЛЬЦА (без этого исполнитель не закроет пункты, не выдумывая)
№	Что	Для чего	Что делает исполнитель без ответа
1	Какая сборка основная: drandromeda.github.io/FORMA.in.th/ или stoianov46.github.io/Forma/	куда вносить правки	работает по Astro-репозиторию, живой деплой использует для проверки
2	Реальные цены вместо примерных (когда будут) и подтверждение уровня «+10–20% к рынку»	таблицы цен на всех страницах	использует примерные цены из Приложения P
3	Страницы районов Пангана: оставить внутренними или удалить	D2	оставляет внутренними, вне навигации
4	Подтвердить допущения D1 и четыре острова	F2, F3	действует по умолчанию (раздел 2)
5	Реальные данные команды (имена, роли, фото, опыт)	About, авторы, Person schema	раздел без людей, без выдумки
6	Реальные проекты: факты, даты, материалы, права на фото	страницы проектов	структурно законченные страницы без неподтверждённых деталей
7	Юридические данные: название юрлица, адрес, телефон, email	Contact, Privacy, Organization schema, NAP	плейсхолдеры запрещены → страницы без этих блоков, пометка [[VERIFY]]
8	Аккаунты: Instagram, YouTube, TikTok, LinkedIn, Google Business Profile; доступ к Search Console и Yandex Webmaster	sameAs, аналитика, верификация	схема без sameAs, аналитика не подключается
9	Токен Telegram-бота, доступ к WhatsApp Business/Cloud API, куда складывать заявки	F6	архитектура и тесты на моках, без боевого подключения
10	Финальные фотографии или разрешение на лицензированные временные	все страницы	лицензированные/сгенерированные заменяемые изображения
11	Нужна ли мультиязычность CreativeLAB в полном объёме (4 языка) и в какие сроки	Часть B, C1	следует ТЗ: 4 языка обязательны
12	Есть ли отдельный список 12 категорий и желаемые темы статей для Журнала	F8	берёт категории из ТЗ
6. ПОРЯДОК ВЫПОЛНЕНИЯ
F1 → F2 → F3 → F5 (быстрые правки навигации и ссылок, снимают блокеры).
F4 (аудит и доработка страниц) вместе с F8 (копирайт, Eco/Concrete, журнал, проекты).
F6 (форма, боты) и F7 (юридические страницы, llms.txt, аналитика, CI, E-E-A-T).
F9 (документы) параллельно со всеми шагами.
F10 (инструментальное QA) в конце.
Часть B: C1 стартует параллельно с F-задачами, если есть ресурс, иначе после F10.
7. DEFINITION OF DONE
Ни одного P0/P1 дефекта; production-сборка проходит; sitemap, robots, canonical, hreflang валидны.
Все 4 языка полные; Hebrew с настоящим RTL; нет непереведённых фрагментов.
0 битых и 0 осиротевших ссылок; 0 заглушек, lorem ipsum, TODO, «coming soon».
На каждой странице: длинный SEO-текст по объёмам ТЗ, прямой ответ 40–60 слов, валидный JSON-LD, таблица цен из Приложения P с пометкой «indicative example» и без цен в JSON-LD.
Нет «Start a Project» в хедере и футере; Locations = Islands (четыре острова).
Все факты прослеживаемы или помечены [[VERIFY]]; все примерные цены помечены [[EXAMPLE-PRICE]]; оба списка в NOTES.md.
Заполнены FINAL_QA.md и RELEASE_CHECKLIST.md; закрыт чек-лист §42 «Final release gates».
Итоговый отчёт исполнителя: что сделано, что проверено, допущения, открытые вопросы к владельцу.
ПРИЛОЖЕНИЕ P — ПРИМЕРНЫЕ ЦЕНЫ ДЛЯ ТАБЛИЦ (решение D6)
P0. Как пользоваться
Все цифры — примеры для ориентира, THB, 2026, без НДС 7%, без земли, госпошлин, мебели и оборудования, если не указано иное. Уровень выбран на 10–20% выше типичного рынка островов, чтобы позиционировать FORMA как премиум.
Обязательная строка под каждой таблицей (EN; на RU/TH/HE — перевод): «Indicative example, October 2026. Excludes VAT, land, government fees and furnishings unless stated. Final figures are confirmed after a site review.»
Цены не попадают в JSON-LD (Offer/price не использовать).
Цифры хранить в одном файле данных; на всех 4 языках числа идентичны. Маркер в исходниках: [[EXAMPLE-PRICE]].
Ориентиры, по которым выбран уровень (только для внутренней калибровки, на сайте не цитировать; источники вторичные, не заменяют реальную смету): гид по стройке на Пхукете 2026 даёт для архитектурной виллы ≈ ฿35 000–60 000+/м², гонорар тайской архитектурной фирмы 8–15% от стоимости стройки, управление проектом 3–5%, дополнительные расходы сверх стройки 30–40%; другой обзор называет гонорар архитектора 5–10%. Продажные цены готовых вилл на Самуи и Пангане у застройщиков ≈ ฿37 000–55 000/м², но это цена с землёй и маржой застройщика, а не стоимость строительства. Отсюда премиум-вилка строительства ฿45 000–85 000/м².
Референс для расчётов «итого»: вилла 250 м².
P1. Таблицы по 13 услугам (три строки на услугу)

Колонки на странице: Пакет · Что входит · Пример цены · Что сдвигает цену. «Что сдвигает цену» писать по реальным факторам страницы (рельеф, доступ, материалы, сложность, площадь, этап).

Услуга	Пакет 1	Пакет 2	Пакет 3
Architecture	Concept design — ฿1 300–2 000/м² (≈ ฿325–500 тыс. для 250 м²)	Concept + development + permit set — ฿3 200–4 800/м² (≈ ฿0.8–1.2 млн)	Full construction documentation — ฿5 000–7 500/м² (≈ ฿1.25–1.9 млн)
Villa Design	Villa concept & masterplan — ฿350–650 тыс. фикс	Design to permit — ฿4 200–6 500/м²	Villa + integrated interiors — ฿6 500–9 500/м²
Interior Design	Concept & mood — ฿1 200–2 200/м²	Full design package (planning, lighting, joinery) — ฿2 800–4 800/м²	Design + FF&E procurement — 12–18% от бюджета меблировки
Construction	Premium build — ฿45 000–52 000/м²	Architect-grade — ฿52 000–65 000/м²	Signature (импортный камень, остекление, smart) — ฿65 000–85 000/м²
Renovation	Refresh — ฿12 000–22 000/м²	Comprehensive — ฿24 000–42 000/м²	Structural transformation — ฿40 000–65 000/м²; обследование ฿45–120 тыс. отдельно
Project Management	5–8% от стройки, минимум ฿250 тыс.	Фикс в месяц — ฿95–190 тыс.	Remote-package для клиентов за рубежом — ฿140–260 тыс./мес
Construction Supervision	2 визита в неделю — ฿68–110 тыс./мес	Ежедневный инженер на объекте — ฿135–230 тыс./мес	Разовый визит с отчётом — ฿7 500–14 000
Technical Supervision	Отчёт по этапу — ฿22–45 тыс.	Review конструкций и инженерии — ฿65–160 тыс.	Полное техническое сопровождение — 1.5–3% от стройки
Landscape Design	Concept & planting plan — ฿380–750/м² сада	Full documentation — ฿750–1 400/м²	Landscape build (hard + soft) — ฿6 500–14 000/м²
Permits & Planning	Проверка участка и ограничений — ฿25–60 тыс.	Координация разрешения на строительство — ฿120–280 тыс. за заявку	Особые случаи (склон, берег, EIA) — ฿120–400 тыс. сверху
Turnkey Projects	Essential turnkey — ฿62 000–72 000/м² all-in	Signature turnkey — ฿72 000–88 000/м²	Estate / multi-villa — ฿88 000–120 000/м²
Eco Construction	Eco-ready villa — ฿55 000–65 000/м²	Passive + solar + water systems — ฿65 000–80 000/м²	Add-ons: solar PV 5–10 кВт ฿220–520 тыс.; дождевая/серая вода ฿180–450 тыс.
Concrete Construction Turnkey	Shell (каркас и ограждающие) — ฿18 000–26 000/м²	Shell + standard premium finish — ฿50 000–60 000/м²	Full concrete turnkey — ฿60 000–72 000/м²

Для услуг в % — рядом показывать пример в бат для виллы 250 м², например: Project Management 5–8% при стройке ฿13 млн ≈ ฿650 тыс.–1.04 млн.

P2. Таблицы по типам остальных страниц

Home / — «Как формируется стоимость»: 13 строк «услуга → формат → пример „от“ → главный фактор». Брать нижние значения из P1 («from ฿…»).

Island pages (Koh Phangan, Koh Samui, Koh Tao, Bali) — две таблицы:

«Типичные проекты на острове» (компактная вилла 120–180 м² ≈ ฿5.8–9.8 млн; семейная вилла 250–350 м² ≈ ฿12–23 млн; бутик-отель 6–10 номеров ≈ ฿38–85 млн) — пересчитать по островному коэффициенту.
«Островной коэффициент к базе Koh Phangan»: Koh Phangan ×1.00 (база) · Koh Samui ×0.95–1.05 · Koh Tao ×1.15–1.30 (логистика, паромы, вода и электричество) · Bali ×0.90–1.10 (отдельная местная команда, смета в THB по курсу на дату). Под таблицей объяснить факторы: доставка материалов, рельеф, доступ техники, сезон муссонов.

Process /process/ — «За что платит клиент по этапам»: Discovery & site review ฿15–45 тыс. (засчитывается в договор) → Concept → Design development → Permits → Build (график платежей 10% аванс, 5–6 платежей по этапам, 5–10% удержание на гарантию) → Supervision → Handover.

Projects index и страницы проектов: «Тип проекта → типичная площадь → ориентир бюджета → что влияет» (значения из P2 выше). На страницах конкретных проектов не писать бюджет проекта как факт, пока владелец не подтвердит реальные данные (§8: «Never invent project budgets»); использовать только «Reference range for this project type».

About, Contact, Journal-статьи: компактная таблица «Как это устроено» (4 строки): гонорар за проектирование 8–12% (пример), стройка за м² (пример из P1), управление проектом 5–8%, что не включено (земля, НДС, госпошлины, мебель).

ПРИЛОЖЕНИЕ Q — СТАНДАРТ КАЧЕСТВА ТЕКСТА, ДИЗАЙНА И SEO (сводка из всех ТЗ; обязательно)
Q1. Объём и структура текста (§8 COPY, §28–29, §34)
Страницы длинные и насыщенные, а не «каталоги»: Home 800–1400 слов; Architecture / Villa Design / Interior / Renovation 1000–1800; Construction / Turnkey 1200–2000; PM / Supervision / Landscape 900–1600; About 900–1500; Process 900–1600; island pages 700–1200; Contact 500–900; ключевые коммерческие страницы услуг при глубине темы 1500–3000+ (стратегические до 3000–4500). Объём не набивать.
Каждый блок отвечает на реальный вопрос клиента; нет стены текста: короткие и средние абзацы, подзаголовки, нумерованные и маркированные списки, таблицы, callout-цитаты, визуальные паузы.
Бюджет слов для страницы услуги ≈ 2000: прямой ответ 50 · введение 180 · для кого 120 · состав работ 260 · подход и условия Koh Phangan 260 · процесс 200 · результаты/deliverables 140 · стоимость (вводный текст + таблица + факторы) 160 · проекты и локации 90 · FAQ 8 × ~75 = 600.
Копирайт: тихая роскошь, конкретика, сенсорная сдержанность, коммерческая польза, локальные факты (рельеф, дождь, влажность, доступ техники, логистика материалов, ветер, вид, приватность). Разные ритмы предложений. Эмодзи — только там, где улучшают сканирование, без «детскости».
Запрещено: штампы (bespoke, seamless, tailored, timeless, unparalleled, world-class, state-of-the-art, cutting-edge, «we turn dreams into reality», «#1/best» без доказательств), keyword stuffing, копирование абзацев между услугами, островами и языками (каждая страница — свой интент и уникальный текст).
Переводы RU/TH/HE: профессиональные, не буквальные; смысл, тон, терминология и поисковый интент сохраняются; цифры и метки цен те же.
Q2. Шаблон страницы услуги (порядок блоков)

Hero → прямой ответ 40–60 слов → введение → для кого → состав работ (scope) → подход и условия острова → процесс (нумерованные этапы) → deliverables → проекты → стоимость: текст + таблица (P1) + факторы → локации (четыре острова) → FAQ 6–10 (ответы 40–120 слов, уникальные) → CTA. Не копировать один и тот же порядок на всех типах страниц: Home, услуга, остров, проект, About, статья имеют разные композиции (§8 Page-specific block strategy).

Q3. Дизайн (§7, §11 и таблица DeepSeek §5)
Эстетика: премиальная тропическая архитектура, редакционный журнал, никакого «подрядчика», «real-estate» шаблона или SaaS; без градиентов-неона, glassmorphism, лишних теней и скруглений.
Палитра: фон тёплый off-white 
#F7F4EF, текст 
#141210 (контраст ≥ 4.5:1), акцент оливковый 
#5A5F45, акцент песок/бронза 
#B8714A, линии 
#E5DED4; акценты — редко.
Типографика: один архитектурный serif для заголовков (Fraunces / Playfair Display / GT Sectra) + чистый sans для текста (Inter); тайский — IBM Plex Sans Thai или Noto Sans Thai; иврит — Heebo или Assistant. Шкала: H1 72–96 px десктоп / 40–48 мобайл; H2 48–56 / 32; H3 32 / 24; основной текст 17–20 px.
Сетка: 12 колонок десктоп, 8 планшет, 4 мобайл; единый max-width; острые углы кнопок; карточки с фото, минимум рамок; header прозрачный на hero и твёрдый при скролле; footer 4 колонки (аккордеон на мобильном), не больше 30 ссылок.
Ритм: чередовать полноширинные фото, split image/text, асимметричные сетки, мозаики проектов, горизонтальные галереи; не повторять одинаковую сетку из трёх карточек; подписи к фото информативные.
Таблицы цен оформлять как часть визуальной системы: тонкие линии, читаемые цифры, на 320 px скролл внутри контейнера, в HE зеркалятся.
Анимация: тонкое появление, hover 150–500 мс, prefers-reduced-motion соблюдать; максимум 2 анимированных элемента в viewport; CSS-only «living background» 30–60 с, едва заметный.
Hero-слайдер 3–5 кадров, управление с клавиатуры и жестами, без CLS; только LCP-картинка с preload.
Мобильная версия — главная цель: те же богатые блоки, а не урезанные; тап-зоны ≥ 44 px; нет горизонтального скролла.
Q4. SEO / GEO (§14, §15, §29–31, DeepSeek §10–11, §19)
У каждой страницы: один основной интент и кластер; уникальные title (≤ 70 символов), meta description (150–200), один H1, логичные H2/H3; self-canonical и взаимные hreflang EN/RU/TH/HE + x-default; Open Graph и Twitter-карточки.
Прямой ответ 40–60 слов сверху, самодостаточный, не дублирует title/meta; факты в HTML, не только в JS.
FAQ 6–10 уникальных на коммерческих страницах; FAQPage-разметка только там, где вопросы реально видны.
JSON-LD по карте из F4; без выдуманных рейтингов, отзывов, наград и цен.
Внутренние ссылки: услуга → родительский хаб, 2–3 соседние услуги, 2–3 проекта, 1 остров, 1–2 статьи, контакт; описательные якоря; нет сирот; важные страницы ≤ 3 кликов; ≤ 30 ссылок в футере.
/llms.txt, разрешение AI-ботов в robots.txt, sitemap с языковыми альтернативами, alt у всех изображений.
Контроль каннибализации: у двух страниц не должно быть одного основного интента (Construction / Construction Supervision / Technical Supervision разводить явно).
Q5. Приёмка текста и страниц

Страница готова, если: объём в диапазоне Q1; структура Q2; дизайн Q3; SEO Q4; таблица цен из Приложения P с пометкой «indicative example»; 0 запрещённых фраз; 4 языка; Lighthouse Performance ≥ 90, SEO 100, A11y ≥ 95; LCP ≤ 2.5 с, INP ≤ 200 мс, CLS ≤ 0.1; ручная редакторская проверка пройдена.
Исполнимое ТЗ — FORMA.in.th
Версия: 28.10.2026. Только архитектурный сайт FORMA. Не применять задачи CreativeLAB к этому репозиторию.

Основной репозиторий: https://github.com/stoianov46/Forma — работать именно в этом репозитории аккаунта stoianov46. Перед правками проверить ветку по умолчанию, git status, GitHub Actions и фактическую конфигурацию GitHub Pages. Не считать URL сайта или настройки деплоя подтверждёнными без проверки.
ПРОТОКОЛ АВТОНОМНОГО ВЫПОЛНЕНИЯ — ОБЯЗАТЕЛЬНО
Это не просьба составить план или отчёт об аудите. Исполнитель должен сам выполнить изменения в репозитории до максимально полного рабочего состояния.
1. Открой именно нужный репозиторий и сначала изучи proposal.md, NOTES.md, PROGRESS.md, package.json, структуру маршрутов, конфиги сборки и GitHub Actions. Сверь каждый пункт этого ТЗ с кодом и production-сайтом. Не считать статус из этого документа актуальным без проверки.
2. Создай/обнови IMPLEMENTATION_PLAN.md и чек-лист задач со статусами TODO / IN_PROGRESS / BLOCKED / PASS. Это внутренние рабочие документы, а не замена реализации.
3. Выполняй работу самостоятельно последовательно: код → локальная сборка → тесты → исправления → повторные тесты. Не останавливайся после аудита, списка рекомендаций или первого успешного build.
4. Не спрашивай разрешения на обратимые технические решения. Выбирай наиболее безопасный вариант, фиксируй допущение в NOTES.md и продолжай. Необратимые действия, публикация неподтверждённых фактов, использование секретов и платные подключения без доступа не выполнять.
5. Перед изменениями проверь git status, создай отдельную ветку, если это возможно, и не затирай пользовательские изменения. Не публикуй секреты в коде, логах, GitHub Actions или отчётах. Все токены — только secrets/env.
6. После каждого этапа запускай релевантные проверки. При падении теста не просто сообщай об ошибке: выясни причину, исправь её и повторяй, пока тест не пройдёт либо не будет доказан внешний блокер.
7. Добавь автоматизированные проверки в CI, где это уместно: сборка, проверка ссылок/маршрутов, локалей, метаданных, запрещённых фраз, H1, sitemap/robots, JSON-LD и TypeScript/lint. Не объявляй тест пройденным, если он не запускался.
8. Автоматизируй всё, что можно без внешних секретов и решений владельца. Для интеграций, которым нужны токены/аккаунты/юридические данные, подготовь готовую реализацию, .env.example, безопасные инструкции и тесты на mock/stub. Пометь только конкретную часть, реально заблокированную доступом, как BLOCKED; продолжай все остальные задачи.
9. Не имитируй внешние эффекты: не заявляй, что форма отправляет заявки, бот подключён, аналитика получает события или сайт опубликован, пока это не подтверждено реальным тестом. Для внешнего подключения зафиксируй точный недостающий секрет/доступ и процедуру проверки.
10. Сохраняй существующие рабочие функции и дизайн-систему. Не удаляй требования старого proposal.md; более строгое требование действует, кроме явных решений владельца в этом ТЗ.
11. Не выдумывай клиентов, проекты, отзывы, награды, имена, опыт, сертификаты, адреса или юридические данные. Неизвестное обозначай [[VERIFY: ...]] в коде/контенте и перечисляй в NOTES.md. Примерные цены допустимы только по соответствующему приложению и с видимой оговоркой Indicative example.
12. После завершения каждой крупной задачи обновляй прогресс. В конце обязательно сформируй AUDIT.md, FINAL_QA.md, RELEASE_CHECKLIST.md, NOTES.md и отчёт с: сделано, проверено командами, результаты тестов, изменённые файлы, внешние блокеры, оставшиеся риски и точные действия владельца.
13. «Готово» означает: production build успешен; автоматические и ручные проверки выполнены; нет известных P0/P1 дефектов; все доступные без внешнего доступа требования закрыты. Не выдавай WARN/BLOCKED за PASS. Если деплой требует прав доступа, подготовь код и CI, но честно оставь только публикацию в статусе BLOCKED.
14. Не останавливайся ради подтверждения обычных допущений. Единственные блокеры — отсутствующие аккаунты/секреты, подтверждение реальных фактов/юридических данных, лицензии на пользовательские материалы или платные решения. Продолжай работу по всем независимым пунктам.
ЧАСТЬ A — FORMA.in.th (архитектурное бюро, Koh Phangan)
2. РЕШЕНИЯ ВЛАДЕЛЬЦА (приоритет над старым ТЗ)
№	Решение	Переопределяет
D1	Кнопка «Start a Project» удаляется из хедера и футера на всех страницах, во всех 4 языках, включая мобильное меню. В теле страниц (hero, финальный CTA-блок, страницы услуг) остаётся. В хедере остаётся ссылка «Contact».	§3 MENU (Header CTA, Mobile menu), §4 IA (Header CTA), §19 (в части хедера/футера)
D2	Меню «Locations» (десктоп, мобильный аккордеон, футер, блок на главной) = одна группа «Islands» из четырёх ссылок: Koh Phangan, Koh Samui, Koh Tao, Bali (/locations/koh-phangan/, /locations/koh-samui/, /locations/koh-tao/, /locations/bali/). Районы (Thong Sala, Haad Rin, Sri Thanu, Chaloklum, Baan Tai, Haad Yao, Haad Salad) — не в навигации.	§3 MENU Locations submenu, §4 IA
D3	Дизайн-этап (§50, три варианта главной /v1 /v2 /v3) завершён; остаётся выбранный вариант, остальные удалить.	§50
D4	На каждой странице обязательны: богатый SEO-текст, блок прямого ответа (featured snippet, 40–60 слов), микроразметка JSON-LD, видимая таблица цен.	усиливает §5, §14, §30, §32
D5	Корень / = мастер-страница услуг, «Home» в меню нет, отдельный /services/ не создавать (уже в ТЗ: §24 ROOT PAGE).	—
D6	Таблицы цен: примерные цены разрешено генерировать для услуг, немного выше рынка (ориентир +10–20% к типичным ценам острова), на очень высоком качественном уровне. Цифры берутся из Приложения P. Страницы — длинные, насыщенные, с соблюдением всех требований ТЗ по дизайну, тексту и SEO (Приложение Q).	§5 «Pricing guidance», §32 «Pricing examples», §0 «Truth rule» (в части цен; требование явной пометки «indicative» сохраняется)


Допущения по умолчанию (если владелец не ответит): четыре острова, а не три; D1 касается только хедера и футера; страницы районов остаются внутренними страницами, доступными только со страницы Koh Phangan.
3. СТАТУС FORMA
✅ Сделано (подтверждено на drandromeda.github.io/FORMA.in.th/; трогать не нужно)
- Корень = мастер-страница услуг; меню начинается с Services; все 13 услуг доступны.
- /services/architecture/ — эталонная структура: H1 → прямой ответ → scope → process → deliverables → «Indicative investment» (относительные диапазоны, без выдуманных цифр) → related projects → FAQ → related services → CTA.
- Хлебные крошки исправлены. Контакты реальные (email, WhatsApp, Telegram). RU и TH главной переведены полностью. Canonical и hreflang в <head>.
- Eco Construction и Concrete Construction есть в меню (EN/RU/TH).
- Нет выдуманных наград, клиентов, цен.
❌ Не сделано / найден баг
- Ссылки на карточки проектов ведут в 404 (потерян сегмент /FORMA.in.th/; EN, RU, TH).
- Служебные документы §43 отсутствуют.
- Штамп «bespoke» в копирайте.
- Журнал: 3 статьи из 12 категорий, нет автора и даты обновления на карточках.
- Нет признаков: /llms.txt, robots для AI-ботов, cookie-баннер, Privacy/Terms/Cookies/PDPA, /editorial-policy/, автор-страницы, аналитика, CI-тесты, измерение бюджетов изображений.
🔍 Не проверено (проверить в ходе работ)
Форма контактов (реально отправляет?), мобильное меню, HE/RTL, Lighthouse/axe, JSON-LD на каждой странице, sitemap/robots, четыре /locations/*, About (команда), боты @formaisland_bot, /v1 /v2 /v3, Eco и Concrete на всех 4 языках, какая из двух сборок основная.
4. ЗАДАЧИ FORMA (по приоритету)
F1 — [БЛОКЕР] Починить ссылки на проекты (404)
- Проблема: href карточек «Selected work» теряют базовый путь: drandromeda.github.io/projects/... вместо drandromeda.github.io/FORMA.in.th/projects/... (так же /ru/, /th/, /he/).
- Сделать: найти компонент карточки проекта; формировать href через единый helper, учитывающий base из конфига и текущую локаль; проверить все места с project-карточками (главная, Related Projects на страницах услуг, Projects, локации, Journal); прогнать краулер (linkinator или аналог) по всему сайту.
- Готово, когда: 0 битых и 0 осиротевших ссылок на всех 4 языках.
F2 — Убрать «Start a Project» из хедера и футера (D1)
1. Удалить из Header (десктоп, прозрачное и sticky-состояния) и из мобильного drawer; удалить из Footer (все локали, RTL тоже).
2. В хедере оставить логотип, меню, переключатель языка, ссылку «Contact». Выровнять сетку, на RTL — зеркально; убрать «дыру» справа.
3. Мобильная шапка сохраняет контакт в один тап (иконка/ссылка «Contact»).
4. Удалить неиспользуемые ключи переводов в EN/RU/TH/HE.
- Готово, когда: grep -ri "start a project" по dist/ находит совпадения только в теле страниц, не в <header> и <footer>; аналогично для RU/TH/HE строк.
F3 — Навигация «Locations» → группа «Islands» (D2)
1. Заголовок группы: Islands / Острова / เกาะ / איים. Внутри ровно четыре ссылки (адреса в D2). То же в мобильном аккордеоне, футере и блоке «Locations» на главной.
2. Все ссылки ведут на существующие страницы с верным base path на 4 языках.
3. Обновить хлебные крошки, related locations, sitemap, hreflang, INTERNAL_LINKING_MAP.md — только четыре острова.
4. Каждая из четырёх страниц — уникальный локальный контент (логистика, климат, доступ, особенности стройки, релевантные проекты), без шаблонной замены названия; FAQ 6–10; прямой ответ; таблица цен; JSON-LD.
- Готово, когда: в навигации нет районов; четыре страницы отдают 200 на всех языках; матч с ботом: список локаций = Koh Phangan, Koh Samui, Koh Tao, Bali, Other.
F4 — Сквозной аудит «каждая страница» (D4)
Матрица URL × EN/RU/TH/HE (формат §34 QA MATRIX, статус PASS/WARN/FAIL). Страница готова, когда все четыре признака в порядке:
Признак	Критерий
Красивый SEO-текст	Объём по §8 COPY: Home 800–1400; Architecture, Villa Design, Interior, Renovation 1000–1800; Construction, Turnkey 1200–2000; PM, Supervision, Landscape 900–1600; About 900–1500; Process 900–1600; Locations 700–1200; Contact 500–900. Короткие и средние абзацы, подзаголовки, списки, таблицы; нет штампов; нет keyword stuffing; без «воды» ради объёма.
Featured snippet	Сразу после hero самодостаточный ответ 40–60 слов, уникальный на странице, не дублирует title/meta; не называть его гарантированным Google snippet. Обязателен на Home, 13 услугах, 4 островах, Process, Projects, About.
JSON-LD	В исходном HTML, 0 ошибок в Rich Results Test; только то, что подтверждено видимым контентом (карта ниже).
Таблица цен	Видимая таблица на каждой коммерческой странице (правила ниже).


Карта схем:
Страница	JSON-LD
Home	Organization (sameAs, knowsAbout, areaServed, serviceType), WebSite, WebPage, ItemList услуг, FAQPage
13 услуг	Service (provider, areaServed), WebPage, BreadcrumbList, FAQPage
4 острова	WebPage, BreadcrumbList, FAQPage, Place/areaServed; LocalBusiness/ProfessionalService только при реальном адресе
Projects, проект	CollectionPage, CreativeWork, ImageObject, BreadcrumbList
Process, About	WebPage, BreadcrumbList; Person/Organization только при реальных данных
Journal, статья	Blog, Article (автор, datePublished, dateModified), BreadcrumbList
Contact	ContactPage, Organization (реальные NAP)


Запрещено в JSON-LD: выдуманные рейтинги, отзывы, награды, цены (Offer/price) без подтверждённых данных.

Таблицы цен — правила (обновлено решением D6; цифры и шаблоны — в Приложении P):
1. Используются примерные цены в THB из Приложения P: сценарий / что входит / пример цены / от чего зависит; под таблицей обязательная строка «Indicative example, 2026. Excl. VAT, land, government fees. Final quote after site review»; CTA «Discuss Your Site». Прежний формат относительных диапазонов (Base · 1.5–2.5×) допустим как дополнительная колонка «что сдвигает цену».
2. Когда владелец пришлёт реальные цены — заменить примерные в тех же ячейках, пометку «example» убрать, поставить дату актуализации. В исходниках примерные цены помечать маркером [[EXAMPLE-PRICE]] для быстрой замены.
3. Все цифры хранятся в одном файле данных (pricing.json/pricing.ts), страницы читают их оттуда; на всех 4 языках цифры идентичны (меняются только подписи). Список [[EXAMPLE-PRICE]] — в NOTES.md.
4. Содержимое по типам: услуги — варианты объёма; острова — типы проектов и факторы цены (логистика, рельеф, доступ); Home — «услуга → как формируется стоимость»; Process — «этап → за что платит клиент»; Projects — «тип проекта → факторы»; About, Contact, Journal — компактная таблица «Как формируется стоимость» (3–5 строк).
5. На 320 px таблица скроллится внутри контейнера (overflow-x:auto), страница не скроллится по горизонтали; в HE зеркалится корректно.
F5 — Закрыть дизайн-этап (D3)
Проверить маршруты /v1 /v2 /v3; оставить только выбранный вариант, остальные удалить вместе с компонентами и картинками; убрать из sitemap, при необходимости редиректы; зафиксировать выбор в NOTES.md.
F6 — Контактная форма и боты
1. Форма /contact/: протестировать реальную отправку. Cloudflare Pages Functions на GitHub Pages не работают → подключить внешний сервис форм или собственный webhook. Нужны: валидация, доступные подписи, понятные ошибки, состояния loading и success, защита от спама, сохранение введённых данных при ошибке.
2. Боты Telegram и WhatsApp (официальные API): воронка Язык → Услуга → Локация → Тип проекта → Описание → Бюджет (опц.) → Сроки (опц.) → Файлы → Контакт → Проверка/Правка → Отправка → Передача человеку. Услуг ровно 13, локаций 5 (4 острова + Other), 4 языка, предвыбор услуги/локации с контекстной страницы, сохранение UTM, валидация вебхуков, rate-limit, валидация загрузок.
3. Данные заявки: timestamp, канал, язык, услуга, локация, тип проекта, описание, бюджет, сроки, имя/контакт, вложения, source URL/campaign.
- Требует доступов от владельца (раздел 5).
F7 — Недостающие обязательные системы
Порядок: юридические страницы (Privacy, Terms, Cookies, PDPA, Accessibility) и cookie-баннер Accept/Reject/Settings (GA и Meta блокируются до согласия) → /llms.txt + robots.txt с разрешением GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot → аналитика (события: cta_click, form_start, form_submit, form_error, bot_start, bot_submit, whatsapp_click, telegram_click, phone_click, email_click, language_switch, project_view, article_read_75) + Search Console + Yandex Webmaster/Metrica → CI-проверки (запрещённые фразы = 0, ровно один H1, title ≤ 70 символов, meta 150–200, 40–60 слов в верхнем блоке, 6+ уникальных FAQ на коммерческих страницах, link-check, tsc --noEmit) → E-E-A-T (/editorial-policy/, /about/authors/[slug]/, Person schema, dateModified) только на реальных данных.
F8 — Контент и копирайт
1. Анти-AI проход по 13 услугам и их переводам (RU/TH/HE синхронно): убрать «bespoke» и прочие штампы.
2. Eco Construction и Concrete Construction Turnkey: полноценные landing-страницы (прямой ответ, принципы/scope, процесс, таблица, FAQ, CTA, схема) на всех 4 языках; без greenwashing и выдуманных инженерных регалий.
3. Журнал: статьи по оставшимся категориям (Architecture, Villa Design, Interior, Construction, Renovation, Materials, Tropical Architecture, Koh Phangan, Project Management, Planning, Technical, Sustainability, Design Process) — автор, дата, дата обновления, связанные услуги/проекты/локации, не менее 2 авторитетных источников; темп 2 статьи в месяц.
4. Страница проекта по шаблону §8 (21 блок), без выдуманных бюджетов, дат, материалов, клиентов; неизвестное остаётся неизвестным.
F9 — Служебные документы (§43)
Создать: URL_INTENT_MAP.md (URL, тип, primary intent, keyword, secondary, entity, location, ссылки in/out, schema, canonical, hreflang, indexability, status), INTERNAL_LINKING_MAP.md (отдельно развести Construction / Construction Supervision / Technical Supervision, чтобы не конкурировали), CONTENT_QA.md, SEO_GEO_AUDIT.md, PROJECT_CONTENT_MATRIX.md, AUDIT.md, IMPLEMENTATION_NOTES.md, FINAL_QA.md, RELEASE_CHECKLIST.md, NOTES.md со списком всех [[VERIFY]].
F10 — Инструментальное QA (в самом конце)
Lighthouse (Performance ≥ 90, SEO 100, A11y ≥ 95), axe-core (0 critical/serious), CWV (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1), бюджет изображений (hero ≤ 250 KB, остальные ≤ 150 KB), брейкпоинты 320/360/375/390/412/430/768/1024/1280/1440/1728/1920, клавиатурная навигация, мобильное меню и dropdown на touch, HE/RTL отдельным прогоном (навигация, крошки, сетки, стрелки, формы, числа, URL, телефоны), браузеры Chrome/Safari/Firefox/Edge, консоль и сеть без ошибок, 404 и редиректы, валидация sitemap, robots, canonical, hreflang, схемы. Чек-лист §42 «Final release gates» закрывается целиком.
ПРИЛОЖЕНИЕ P — ПРИМЕРНЫЕ ЦЕНЫ ДЛЯ ТАБЛИЦ (решение D6)
P0. Как пользоваться
- Все цифры — примеры для ориентира, THB, 2026, без НДС 7%, без земли, госпошлин, мебели и оборудования, если не указано иное. Уровень выбран на 10–20% выше типичного рынка островов, чтобы позиционировать FORMA как премиум.
- Обязательная строка под каждой таблицей (EN; на RU/TH/HE — перевод): «Indicative example, October 2026. Excludes VAT, land, government fees and furnishings unless stated. Final figures are confirmed after a site review.»
- Цены не попадают в JSON-LD (Offer/price не использовать).
- Цифры хранить в одном файле данных; на всех 4 языках числа идентичны. Маркер в исходниках: [[EXAMPLE-PRICE]].
- Ориентиры, по которым выбран уровень (только для внутренней калибровки, на сайте не цитировать; источники вторичные, не заменяют реальную смету): гид по стройке на Пхукете 2026 даёт для архитектурной виллы ≈ ฿35 000–60 000+/м², гонорар тайской архитектурной фирмы 8–15% от стоимости стройки, управление проектом 3–5%, дополнительные расходы сверх стройки 30–40%; другой обзор называет гонорар архитектора 5–10%. Продажные цены готовых вилл на Самуи и Пангане у застройщиков ≈ ฿37 000–55 000/м², но это цена с землёй и маржой застройщика, а не стоимость строительства. Отсюда премиум-вилка строительства ฿45 000–85 000/м².
- Референс для расчётов «итого»: вилла 250 м².
P1. Таблицы по 13 услугам (три строки на услугу)
Колонки на странице: Пакет · Что входит · Пример цены · Что сдвигает цену. «Что сдвигает цену» писать по реальным факторам страницы (рельеф, доступ, материалы, сложность, площадь, этап).
Услуга	Пакет 1	Пакет 2	Пакет 3
Architecture	Concept design — ฿1 300–2 000/м² (≈ ฿325–500 тыс. для 250 м²)	Concept + development + permit set — ฿3 200–4 800/м² (≈ ฿0.8–1.2 млн)	Full construction documentation — ฿5 000–7 500/м² (≈ ฿1.25–1.9 млн)
Villa Design	Villa concept & masterplan — ฿350–650 тыс. фикс	Design to permit — ฿4 200–6 500/м²	Villa + integrated interiors — ฿6 500–9 500/м²
Interior Design	Concept & mood — ฿1 200–2 200/м²	Full design package (planning, lighting, joinery) — ฿2 800–4 800/м²	Design + FF&E procurement — 12–18% от бюджета меблировки
Construction	Premium build — ฿45 000–52 000/м²	Architect-grade — ฿52 000–65 000/м²	Signature (импортный камень, остекление, smart) — ฿65 000–85 000/м²
Renovation	Refresh — ฿12 000–22 000/м²	Comprehensive — ฿24 000–42 000/м²	Structural transformation — ฿40 000–65 000/м²; обследование ฿45–120 тыс. отдельно
Project Management	5–8% от стройки, минимум ฿250 тыс.	Фикс в месяц — ฿95–190 тыс.	Remote-package для клиентов за рубежом — ฿140–260 тыс./мес
Construction Supervision	2 визита в неделю — ฿68–110 тыс./мес	Ежедневный инженер на объекте — ฿135–230 тыс./мес	Разовый визит с отчётом — ฿7 500–14 000
Technical Supervision	Отчёт по этапу — ฿22–45 тыс.	Review конструкций и инженерии — ฿65–160 тыс.	Полное техническое сопровождение — 1.5–3% от стройки
Landscape Design	Concept & planting plan — ฿380–750/м² сада	Full documentation — ฿750–1 400/м²	Landscape build (hard + soft) — ฿6 500–14 000/м²
Permits & Planning	Проверка участка и ограничений — ฿25–60 тыс.	Координация разрешения на строительство — ฿120–280 тыс. за заявку	Особые случаи (склон, берег, EIA) — ฿120–400 тыс. сверху
Turnkey Projects	Essential turnkey — ฿62 000–72 000/м² all-in	Signature turnkey — ฿72 000–88 000/м²	Estate / multi-villa — ฿88 000–120 000/м²
Eco Construction	Eco-ready villa — ฿55 000–65 000/м²	Passive + solar + water systems — ฿65 000–80 000/м²	Add-ons: solar PV 5–10 кВт ฿220–520 тыс.; дождевая/серая вода ฿180–450 тыс.
Concrete Construction Turnkey	Shell (каркас и ограждающие) — ฿18 000–26 000/м²	Shell + standard premium finish — ฿50 000–60 000/м²	Full concrete turnkey — ฿60 000–72 000/м²


Для услуг в % — рядом показывать пример в бат для виллы 250 м², например: Project Management 5–8% при стройке ฿13 млн ≈ ฿650 тыс.–1.04 млн.
P2. Таблицы по типам остальных страниц
Home / — «Как формируется стоимость»: 13 строк «услуга → формат → пример „от“ → главный фактор». Брать нижние значения из P1 («from ฿…»).

Island pages (Koh Phangan, Koh Samui, Koh Tao, Bali) — две таблицы:
1. «Типичные проекты на острове» (компактная вилла 120–180 м² ≈ ฿5.8–9.8 млн; семейная вилла 250–350 м² ≈ ฿12–23 млн; бутик-отель 6–10 номеров ≈ ฿38–85 млн) — пересчитать по островному коэффициенту.
2. «Островной коэффициент к базе Koh Phangan»: Koh Phangan ×1.00 (база) · Koh Samui ×0.95–1.05 · Koh Tao ×1.15–1.30 (логистика, паромы, вода и электричество) · Bali ×0.90–1.10 (отдельная местная команда, смета в THB по курсу на дату). Под таблицей объяснить факторы: доставка материалов, рельеф, доступ техники, сезон муссонов.
Process /process/ — «За что платит клиент по этапам»: Discovery & site review ฿15–45 тыс. (засчитывается в договор) → Concept → Design development → Permits → Build (график платежей 10% аванс, 5–6 платежей по этапам, 5–10% удержание на гарантию) → Supervision → Handover.

Projects index и страницы проектов: «Тип проекта → типичная площадь → ориентир бюджета → что влияет» (значения из P2 выше). На страницах конкретных проектов не писать бюджет проекта как факт, пока владелец не подтвердит реальные данные (§8: «Never invent project budgets»); использовать только «Reference range for this project type».

About, Contact, Journal-статьи: компактная таблица «Как это устроено» (4 строки): гонорар за проектирование 8–12% (пример), стройка за м² (пример из P1), управление проектом 5–8%, что не включено (земля, НДС, госпошлины, мебель).
ПРИЛОЖЕНИЕ Q — СТАНДАРТ КАЧЕСТВА ТЕКСТА, ДИЗАЙНА И SEO (сводка из всех ТЗ; обязательно)
Q1. Объём и структура текста (§8 COPY, §28–29, §34)
- Страницы длинные и насыщенные, а не «каталоги»: Home 800–1400 слов; Architecture / Villa Design / Interior / Renovation 1000–1800; Construction / Turnkey 1200–2000; PM / Supervision / Landscape 900–1600; About 900–1500; Process 900–1600; island pages 700–1200; Contact 500–900; ключевые коммерческие страницы услуг при глубине темы 1500–3000+ (стратегические до 3000–4500). Объём не набивать.
- Каждый блок отвечает на реальный вопрос клиента; нет стены текста: короткие и средние абзацы, подзаголовки, нумерованные и маркированные списки, таблицы, callout-цитаты, визуальные паузы.
- Бюджет слов для страницы услуги ≈ 2000: прямой ответ 50 · введение 180 · для кого 120 · состав работ 260 · подход и условия Koh Phangan 260 · процесс 200 · результаты/deliverables 140 · стоимость (вводный текст + таблица + факторы) 160 · проекты и локации 90 · FAQ 8 × ~75 = 600.
- Копирайт: тихая роскошь, конкретика, сенсорная сдержанность, коммерческая польза, локальные факты (рельеф, дождь, влажность, доступ техники, логистика материалов, ветер, вид, приватность). Разные ритмы предложений. Эмодзи — только там, где улучшают сканирование, без «детскости».
- Запрещено: штампы (bespoke, seamless, tailored, timeless, unparalleled, world-class, state-of-the-art, cutting-edge, «we turn dreams into reality», «#1/best» без доказательств), keyword stuffing, копирование абзацев между услугами, островами и языками (каждая страница — свой интент и уникальный текст).
- Переводы RU/TH/HE: профессиональные, не буквальные; смысл, тон, терминология и поисковый интент сохраняются; цифры и метки цен те же.
Q2. Шаблон страницы услуги (порядок блоков)
Hero → прямой ответ 40–60 слов → введение → для кого → состав работ (scope) → подход и условия острова → процесс (нумерованные этапы) → deliverables → проекты → стоимость: текст + таблица (P1) + факторы → локации (четыре острова) → FAQ 6–10 (ответы 40–120 слов, уникальные) → CTA. Не копировать один и тот же порядок на всех типах страниц: Home, услуга, остров, проект, About, статья имеют разные композиции (§8 Page-specific block strategy).
Q3. Дизайн (§7, §11 и таблица DeepSeek §5)
- Эстетика: премиальная тропическая архитектура, редакционный журнал, никакого «подрядчика», «real-estate» шаблона или SaaS; без градиентов-неона, glassmorphism, лишних теней и скруглений.
- Палитра: фон тёплый off-white #F7F4EF, текст #141210 (контраст ≥ 4.5:1), акцент оливковый #5A5F45, акцент песок/бронза #B8714A, линии #E5DED4; акценты — редко.
- Типографика: один архитектурный serif для заголовков (Fraunces / Playfair Display / GT Sectra) + чистый sans для текста (Inter); тайский — IBM Plex Sans Thai или Noto Sans Thai; иврит — Heebo или Assistant. Шкала: H1 72–96 px десктоп / 40–48 мобайл; H2 48–56 / 32; H3 32 / 24; основной текст 17–20 px.
- Сетка: 12 колонок десктоп, 8 планшет, 4 мобайл; единый max-width; острые углы кнопок; карточки с фото, минимум рамок; header прозрачный на hero и твёрдый при скролле; footer 4 колонки (аккордеон на мобильном), не больше 30 ссылок.
- Ритм: чередовать полноширинные фото, split image/text, асимметричные сетки, мозаики проектов, горизонтальные галереи; не повторять одинаковую сетку из трёх карточек; подписи к фото информативные.
- Таблицы цен оформлять как часть визуальной системы: тонкие линии, читаемые цифры, на 320 px скролл внутри контейнера, в HE зеркалятся.
- Анимация: тонкое появление, hover 150–500 мс, prefers-reduced-motion соблюдать; максимум 2 анимированных элемента в viewport; CSS-only «living background» 30–60 с, едва заметный.
- Hero-слайдер 3–5 кадров, управление с клавиатуры и жестами, без CLS; только LCP-картинка с preload.
- Мобильная версия — главная цель: те же богатые блоки, а не урезанные; тап-зоны ≥ 44 px; нет горизонтального скролла.
Q4. SEO / GEO (§14, §15, §29–31, DeepSeek §10–11, §19)
- У каждой страницы: один основной интент и кластер; уникальные title (≤ 70 символов), meta description (150–200), один H1, логичные H2/H3; self-canonical и взаимные hreflang EN/RU/TH/HE + x-default; Open Graph и Twitter-карточки.
- Прямой ответ 40–60 слов сверху, самодостаточный, не дублирует title/meta; факты в HTML, не только в JS.
- FAQ 6–10 уникальных на коммерческих страницах; FAQPage-разметка только там, где вопросы реально видны.
- JSON-LD по карте из F4; без выдуманных рейтингов, отзывов, наград и цен.
- Внутренние ссылки: услуга → родительский хаб, 2–3 соседние услуги, 2–3 проекта, 1 остров, 1–2 статьи, контакт; описательные якоря; нет сирот; важные страницы ≤ 3 кликов; ≤ 30 ссылок в футере.
- /llms.txt, разрешение AI-ботов в robots.txt, sitemap с языковыми альтернативами, alt у всех изображений.
- Контроль каннибализации: у двух страниц не должно быть одного основного интента (Construction / Construction Supervision / Technical Supervision разводить явно).
Q5. Приёмка текста и страниц
Страница готова, если: объём в диапазоне Q1; структура Q2; дизайн Q3; SEO Q4; таблица цен из Приложения P с пометкой «indicative example»; 0 запрещённых фраз; 4 языка; Lighthouse Performance ≥ 90, SEO 100, A11y ≥ 95; LCP ≤ 2.5 с, INP ≤ 200 мс, CLS ≤ 0.1; ручная редакторская проверка пройдена.
