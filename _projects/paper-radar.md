---
title: "Project - Paper Radar"
toc: true
toc_sticky: true
last_modified_at: 2026-03-19
---

## Introduction

Paper Radar is a minimalist daily AI paper digest that helps me scan the most interesting new research without drowning in the full arXiv firehose.

The live site is here: [Paper Radar](/paper-radar/)
{: .notice--primary}

## Why I Built It

Keeping up with AI research is exciting, but also exhausting. There are too many papers, too many tabs, and not enough signal when I only have a few minutes.

I wanted a small product that could answer three practical questions every day:

- Which papers are actually worth my attention?
- Can I get different summary depths depending on my energy level?
- Can this run as a lightweight static site instead of a heavy full-stack app?

## What It Does

Paper Radar publishes a curated list of AI papers with three reading modes:

- `Expert` mode for method details and technical depth
- `General` mode for a faster, professional summary
- `Lazy` mode for a short, punchy takeaway

The result is a reading experience that feels more like a daily research briefing than a raw paper feed.

{% include figure image_path="/images/paper-radar_preview.png" caption="Paper Radar home page preview." %}

## How It Works

The current workflow is intentionally simple and cheap to run:

1. Fetch the latest papers from arXiv.
2. Filter obvious noise with lightweight scripts.
3. Score and shortlist the most promising papers.
4. Generate layered summaries for different reading modes.
5. Publish the result as a static front end.

This project is built with a human-in-the-loop workflow, where scripts handle repetitive work and AI assistance helps with higher-value curation and summarization.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Static data files
- arXiv as the upstream paper source
- NotebookLM-assisted summarization in the current workflow

## Links

- Live app: [Paper Radar](/paper-radar/)
- Source notes: [Paper Radar source folder](https://github.com/krisshen/mywebsite/tree/master/_paper-radar-source)
- Related post: [Building Paper Radar](/project_paper_radar/paper-radar-launch/)
