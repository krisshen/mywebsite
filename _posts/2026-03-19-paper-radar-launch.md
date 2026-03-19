---
title: "[paper radar] Building A Minimalist Daily AI Paper Digest"
header:
tags: [myprojects, paper-radar, nextjs, ai, arxiv]
categories: [project_paper_radar]
excerpt: Launching Paper Radar, a lightweight daily AI paper digest with expert, general, and lazy summary modes.
last_modified_at: 2026-03-19
---

Paper Radar started from a very simple frustration: I wanted to keep up with AI papers, but most days I did not want to read fifty abstracts just to find a few worth my time.

So I built a small workflow and static site that turns a noisy stream of new papers into a compact daily digest.

## What I Wanted

There were three goals from the beginning:

- keep the product lightweight and easy to publish
- surface only a small number of interesting papers each day
- provide different summary depths for different moods and time budgets

That last point became the core interaction model:

- `Expert` for technical readers who want the method and contribution details
- `General` for a fast but still useful professional summary
- `Lazy` for a short, memorable takeaway

## The Current Workflow

The current version follows a simple hybrid pipeline:

1. Fetch recent papers from arXiv.
2. Filter out obvious noise with scripts.
3. Score and select the strongest candidates.
4. Generate layered summaries for each selected paper.
5. Publish everything as a static front end.

I like this setup because it keeps the boring work automated while leaving room for better judgment in curation and summarization.

## Why I Like This Project

Paper Radar feels like the kind of tool I would actually use myself. It is small, focused, and opinionated:

- small enough to maintain without turning into a platform
- focused enough to help me decide what to read next
- opinionated enough to prioritize signal over completeness

The project page for more details is here: [Paper Radar project page](/projects/paper-radar/)

And the live app is here: [Paper Radar](/paper-radar/)
