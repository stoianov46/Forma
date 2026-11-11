# Workflow reference

How work on this repo is planned, tracked, and shipped: GitHub Issues +
Projects (v2), one board, branches and PRs bound to issues by number. This is
the reference doc — for "what do I actually type," see `docs/HowTo.md`.

## 1. Three layers

```
Proposal (the original brief, or docs/proposals/<slug>.md for future ones)
   │
   ▼
Epic — ONE per proposal — a GitHub Issue, labeled `type: epic`,
        backed by one docs/epics/EPIC-XXX-<slug>.md
   │
   ▼
Task — as many as the proposal needs, but each one LARGE (a real work
       session, not a micro-step) — a GitHub Issue, labeled `type: task`,
       linked as a native sub-issue of the epic, usually backed by a
       pre-written docs/tasks/TASK-XXX-<slug>.md (see docs/tasks/README.md
       for the ad-hoc-task exception)
```

**One proposal = one epic.** Earlier in this repo's history the single
FORMA proposal was split into 10 separate epic issues, one per roadmap
phase — that turned out to be pure overhead: more issues to open, more
links to keep straight, for work that's all one brief built by the same
team in the same sessions. It's now one epic; what used to be 10 epics are
now 10 (plus 2 newly discovered) large tasks under it. Don't re-introduce
multiple epics per proposal — if a proposal is big, its epic file is big,
and its task list is long; that's fine.

**The GitHub Issue is always the status source of truth.** The markdown
files under `docs/epics/` and `docs/tasks/` are an optional second layer for
specs too long to comfortably live in an issue body — never a duplicate
status tracker. If a file's `**Status:**` line and the board disagree, run
`make board-sync-status` (epics) or `make board-sync-tasks` (tasks) to push
the file's status onto the board (see `docs/epics/README.md` /
`docs/tasks/README.md`); the board is never edited to "match the file" any
other way, and the file is never edited to match the board.

**Also: one proposal, one file.** Don't split a proposal into
the original brief + `proposal-v2.md` / `proposal(NEW2).md` / etc. — that
happened once here (see `docs/Proposals.md` for the history) and just
meant half the requirements were invisible to everything built from
`docs/epics/`. If a brief adds to or tightens an earlier one, edit
the original brief directly, or add a clearly dated addendum section inside it.

## 2. Issue types

Three issue types, three GitHub Issue Forms under
`.github/ISSUE_TEMPLATE/`:

| Type | Label | Template | Title prefix |
|---|---|---|---|
| Epic | `type: epic` | `feature-epic.yml` | `[EPIC] ` |
| Task | `type: task` | `feature-task.yml` | `[TASK] ` |
| Bug  | `type: bug`  | `bug.yml`           | `[BUG] `  |

## 3. The board

One GitHub Project (v2), titled **"FORMA Roadmap"**, with these fields:

- **Status** (single-select): `Backlog` → `Ready` → `In Progress` →
  `In Test` → `Done`.
- **Priority** (single-select): `P0` (must happen / blocking), `P1` (should
  happen soon), `P2` (nice to have).
- **Phase** (single-select): `Phase 1` .. `Phase 10`, matching
  the original brief's own numbered ROADMAP (brand shell → design system →
  global layout → homepage → core pages → bots → SEO/schema → 4 languages
  → performance → QA → launch checklist). If a future project using this
  same workflow setup doesn't have a real numbered roadmap to draw from,
  skip the Phase field entirely rather than inventing phase numbers.

### The Status field's one annoying wrinkle (now automated)

Every new GitHub Project ships with a **built-in** `Status` field whose
default options are `Todo` / `In Progress` / `Done`. The GraphQL API refuses
to delete or recreate the *field* — `gh project field-delete` fails with
"Only custom fields can be deleted." Its *options* are a different story:
`gh project field-create`'s cousin mutation, `updateProjectV2Field`, accepts
a full replacement `singleSelectOptions` set (confirmed directly against
the live API) — it just can't rename an option **in place** by ID, only
replace the whole set at once. `scripts/github-bootstrap.sh` does exactly
that automatically, renaming Todo/In Progress/Done to
`Backlog`/`Ready`/`In Progress`/`In Test`/`Done` — **but only when the
options are still exactly the fresh GitHub default**, since a wholesale
replacement discards any items' existing Status values. If you've already
customized Status differently before running `board-setup`, it leaves them
alone and warns instead of guessing.

`Priority` and `Phase` are ordinary custom fields, and `scripts/github-bootstrap.sh`
creates both of those too via `gh project field-create`.

## 4. Automating In Progress → In Test → Done

Two options, in preference order:

1. **The Project's own Workflows tab** (Project → `⋯` → Workflows) —
   zero extra setup if your GitHub plan/host offers it: "Item added →
   Backlog", "Pull request opened, linked → In Test", "Issue closed / PR
   merged → Done". Whether this repo's Projects UI actually offers a
   "Pull request opened" trigger can't be verified from a terminal
   session — check for it yourself.
2. **The guaranteed alternative**: `.github/workflows/project-status-sync.yml`,
   already in this repo, gated behind a `PROJECT_TOKEN` secret (a classic
   PAT with `repo` + `project` scopes — the default `GITHUB_TOKEN` cannot
   write to Projects v2). Add the secret under Repo → Settings → Secrets
   and variables → Actions, and this workflow moves the linked issue to
   `In Test` when its PR opens and `Done` when it merges, with no
   dependency on whether option 1 is available.

Moving Backlog → Ready → In Progress is not automated in either path — that's
a planning decision a person makes (`make task-start` moves a card to
`In Progress` the moment you actually start it; see `docs/HowTo.md`).

## 5. Branch naming

- Tasks: `task/<issue-number>-<slug>`
- Bugs: `fix/<issue-number>-<slug>`

`scripts/start-task.sh` (→ `make task-start TASK=<n>`) derives the slug from
the issue title and picks `fix/` automatically if the issue is labeled
`type: bug`, `task/` otherwise.

## 6. The PR rule that binds it all together

Every PR description must contain one of:

- `Closes #<n>` / `Fixes #<n>` / `Resolves #<n>` — for the PR that finishes
  the issue. GitHub auto-closes the issue on merge, and this is exactly the
  text `.github/workflows/project-status-sync.yml` parses out of the PR
  body to know which board item to move.
- `Part of #<n>` — for a PR that's only partial progress on an issue (won't
  auto-close it, and the status-sync workflow does not move the card for
  this form — only a closing keyword does).

`.github/PULL_REQUEST_TEMPLATE.md` has this built in as the first line.

## 7. CI

`.github/workflows/ci.yml` runs on every PR and every push to `main`:
installs dependencies, then runs this project's actual `lint`/`check`/`build`
scripts (there is no separate `typecheck` or `test` script in this project's
`package.json` today — `check` is Astro's own type checker across `.astro`
files, `astro check`). Requiring this to pass before merge is a **manual**
one-time repo setting: Repo → Settings → Branches → Branch protection rules
→ require the `CI` status check.

## 8. First-time setup

1. `gh auth login` (if not already authenticated) and
   `gh auth refresh -s project,read:project` — the `project` scope isn't
   granted by default and the board scripts need it. (This repo's token
   already has it — see `gh auth status`.)
2. `make board-setup` — labels, the Project board, its Priority/Phase
   fields, and the Status field's options renamed to Backlog/Ready/In
   Progress/In Test/Done (`scripts/github-bootstrap.sh`).
3. Do the two manual steps `board-setup` prints at the end: wire up board
   automation (§4 above), turn on branch protection (§7 above).
4. Write the one `docs/epics/EPIC-*.md` file for the proposal (see
   `docs/epics/README.md`), then `make board-epics`
   (`scripts/create-epic-issues.sh`), then `make board-sync-status` to
   correct it if it isn't starting from Backlog.
5. Write the large `docs/tasks/TASK-*.md` files the proposal breaks into
   (see `docs/tasks/README.md`), then `make board-tasks`
   (`scripts/create-task-issues.sh`) — links each as a sub-issue of the
   epic automatically — then `make board-sync-tasks` to correct any task
   that isn't starting from Backlog (e.g. work already done).
6. From here on, day to day: `docs/HowTo.md`.
