---
description: PaperRadar daily curation runbook with exact commands, NotebookLM usage, and publish flow
---

# PaperRadar Daily Workflow

This document is the execution runbook for producing a new daily PaperRadar batch.

Use it when the task is "do today's papers" or any equivalent daily-refresh request.

## Scope

This workflow covers:

1. Refreshing the raw arXiv feed
2. Filtering the candidate set
3. Manually curating the Top 10
4. Using NotebookLM to produce bilingual summaries
5. Regenerating `data/papers.ts`
6. Verifying the local app
7. Understanding how the static `paper-radar/` site is published

It does not cover changing ranking heuristics or redesigning the UI.

## Working Directory

All paper-generation commands should be run from:

`_paper-radar-source`

In Codex, that is usually:

`/Users/kris/workspace/mywebsite/_paper-radar-source`

or the current worktree equivalent, for example:

`/Users/kris/.codex/worktrees/<id>/mywebsite/_paper-radar-source`

## Important Constraints

- Use `UV_CACHE_DIR=.uv-cache` when running `uv` commands in Codex to avoid sandbox cache permission issues.
- `scripts/score_papers.py` is still a placeholder. Do not treat its output as real curation.
- The real daily ranking is manual/editorial.
- `scripts/sync_to_ts.py` is the authoritative place where curated bilingual summaries are embedded before generating `data/papers.ts`.
- The website path `/paper-radar/` is served from the checked-in static folder `paper-radar/`, not directly from `_paper-radar-source`.
- There is a GitHub Actions workflow that rebuilds `paper-radar/` automatically after merge to `main` or `master` if `_paper-radar-source/data/**`, `_paper-radar-source/components/**`, `_paper-radar-source/app/**`, or `_paper-radar-source/contexts/**` changed.

## Daily Execution Steps

### 1. Refresh the input data

Run:

```bash
UV_CACHE_DIR=.uv-cache uv run scripts/fetch_papers.py
UV_CACHE_DIR=.uv-cache uv run scripts/filter_papers.py
```

Expected outputs:

- `data/papers_raw.json`
- `data/papers_filtered.json`

Quick checks:

```bash
jq 'length' data/papers_raw.json
jq 'length' data/papers_filtered.json
```

### 2. Review the filtered candidates

Start with the newest filtered papers:

```bash
jq -r '.[0:40][] | [.id, .published, .title] | @tsv' data/papers_filtered.json
```

Then inspect titles, categories, and abstracts for promising candidates:

```bash
jq -r '.[] | select(.id=="<paper_id>") | "ID: \(.id)\nTITLE: \(.title)\nCATS: \(.categories | join(", "))\nABSTRACT: \(.summary)\n---"' data/papers_filtered.json
```

Selection criteria:

- Novel method or strong technical contribution
- Practical engineering value
- Relevance to AI builders or researchers
- Strong benchmark result, meaningful dataset, or important safety finding
- Good variety across topics when possible

Avoid filling the list with near-duplicates unless the day is unusually concentrated.

### 3. Curate the Top 10 manually

Do not rely on `scripts/score_papers.py` for real scoring.

Instead:

1. Choose 10 papers manually from `data/papers_filtered.json`
2. Update `data/top_10.json`
3. For each paper include:
   - `id`
   - `title`
   - `score`
   - `reason`
   - `categories`
   - `published`
   - `pdf_url`

Use descending scores and keep reasons short and editorial.

Example inspection command:

```bash
jq '.[] | select(.id=="<paper_id>") | {id,title,categories,published,pdf_url}' data/papers_filtered.json
```

### 4. Create a NotebookLM notebook for the day

Notebook title format:

`PaperRadar Daily Curated (YYYY-MM-DD)`

Add the 10 selected arXiv URLs, usually:

`https://arxiv.org/abs/<paper_id>`

or the paper PDF URLs if needed.

Preferred workflow in Codex:

1. Create the notebook
2. Add the 10 selected sources
3. Query NotebookLM in smaller batches instead of all 10 at once if latency is high

### 5. Generate bilingual summaries in NotebookLM

NotebookLM should produce summaries for all 3 modes in both Chinese and English.

Preferred output shape per paper:

- `id`
- `title`
- `expert`
- `general`
- `lazy`

Run separate Chinese and English passes if that is more reliable.

Recommended query pattern:

```text
Return strict JSON only, no markdown. Summarize these papers. Output an array of objects with exactly these keys: id, title, expert, general, lazy. Use the exact arXiv ids provided. expert: 2-3 technical sentences. general: 2 sentences. lazy: 1 sentence.
```

For Chinese batches:

- Request Simplified Chinese

For English batches:

- Request English only

If NotebookLM drops an `id` or returns malformed JSON:

1. Re-query that paper individually
2. Do not guess missing summaries if the source can be queried again

### 6. Update `scripts/sync_to_ts.py`

Insert the final bilingual summaries into `SUMMARIES` in:

`scripts/sync_to_ts.py`

Current expected structure per paper:

```python
"<paper_id>": {
    "expert": {"zh": "...", "en": "..."},
    "general": {"zh": "...", "en": "..."},
    "lazy": {"zh": "...", "en": "..."},
}
```

Keep the language keys as `zh` and `en`.

Do not regress the generated TypeScript types. The current generator must preserve:

- `SummaryContent = string | { zh: string; en: string }`
- `getSummaryText(...)`
- `recommendationScore`
- `generatedDateLabel`
- `totalFilteredCount`

### 7. Regenerate `data/papers.ts`

Run:

```bash
UV_CACHE_DIR=.uv-cache uv run scripts/sync_to_ts.py
```

Optional syntax check:

```bash
PYTHONPYCACHEPREFIX=.pycache python3 -m py_compile scripts/sync_to_ts.py
```

If you run the syntax check, remove `.pycache` afterwards:

```bash
rm -rf .pycache
```

### 8. Verify the generated data

Check the key fields:

```bash
rg -n "generatedDateLabel|totalFilteredCount|recommendationScore" data/papers.ts
```

Check that bilingual summaries exist:

```bash
rg -n '"zh":|"en":' data/papers.ts
```

Confirm the Top 10 IDs:

```bash
jq -r '.[].id' data/top_10.json
```

### 9. Verify the local app

If dependencies are missing:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Check locally:

- `http://localhost:3000`

Important:

- English mode should show English summaries for today’s papers
- Chinese mode should show Chinese summaries
- The date badge should match the current batch

### 10. Understand the publish step

Local source changes do not automatically update the checked-in static site folder.

The live website path `/paper-radar/` uses:

`/paper-radar`

The source app is:

`/_paper-radar-source`

Static export configuration is defined in:

`next.config.js`

with:

- `output: 'export'`
- `basePath: '/paper-radar'`

### 11. GitHub Actions publish behavior

The workflow file is:

`.github/workflows/build-paper-radar.yml`

It runs on `push` to `main` or `master` when any of these paths change:

- `_paper-radar-source/data/**`
- `_paper-radar-source/components/**`
- `_paper-radar-source/app/**`
- `_paper-radar-source/contexts/**`

It performs:

1. `npm ci`
2. `npm run build`
3. removes existing `paper-radar/*`
4. copies `_paper-radar-source/out/*` into `paper-radar/`
5. commits and pushes rebuilt static assets

Practical consequence:

- If the daily batch changes `data/papers.ts` or other files in `_paper-radar-source/data/**`, the GitHub workflow should rebuild and publish the static `paper-radar/` folder after merge.
- Changing only `scripts/sync_to_ts.py` does not trigger the workflow.

## Minimum Daily Done Criteria

A daily run is complete when all of the following are true:

1. `data/papers_raw.json` is refreshed
2. `data/papers_filtered.json` is refreshed
3. `data/top_10.json` reflects the new curated batch
4. `scripts/sync_to_ts.py` contains the new bilingual summaries
5. `data/papers.ts` is regenerated for the current date
6. Local UI looks correct in both Chinese and English
7. The branch includes data changes that will trigger the GitHub export workflow after merge

## Common Failure Modes

### `uv` cache permission error

Use:

```bash
UV_CACHE_DIR=.uv-cache uv run ...
```

### NotebookLM authentication expired

Re-authenticate with the NotebookLM MCP auth flow, then refresh auth before querying.

### English toggle still shows Chinese

Cause:

- summaries were written as plain strings instead of `{ zh, en }`

Fix:

1. regenerate English summaries
2. ensure `SUMMARIES` stores bilingual objects
3. rerun `scripts/sync_to_ts.py`

### Static site still shows old content after merge

Check:

1. whether `_paper-radar-source/data/**` actually changed
2. whether the GitHub workflow ran
3. whether the workflow build succeeded

## Default Operating Style

When asked to "do today's papers", the assistant should:

1. run the fetch and filter steps
2. inspect recent filtered candidates
3. manually curate the Top 10
4. use NotebookLM to generate bilingual summaries
5. update `scripts/sync_to_ts.py`
6. regenerate `data/papers.ts`
7. verify locally
8. leave the branch ready for merge so GitHub Actions can rebuild the static `paper-radar/` site
