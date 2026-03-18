---
trigger: always_on
---

# PaperRadar Project Rules

## 1. Project Overview
- **Name**: PaperRadar
- **Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React 18.
- **Architecture**: 100% Frontend static site. No database, no backend server. Data is stored locally in `data/papers.ts`.
- **Purpose**: A minimalist, daily curated AI paper reading product offering 3 different summary difficulties (Expert, General, Lazy).

## 2. Core Principles
- **Keep It Simple (KISS)**: This is an MVP. Do NOT add complex abstractions, databases, state management libraries, or backend APIs unless explicitly requested.
- **Data Layer**: All paper data is manually maintained in `data/papers.ts`. Do not build automated scrapers or DB connections.
- **Design System**: 
  - Minimalist and clean.
  - Typography: `Inter` for general text, `Georgia` for logos and paper titles.
  - Colors: Primarily monochrome with specific red accents (e.g., `#c0392b` for hover states, star ratings, and active indicators).
  - Animations: Keep them subtle. Fade-ins (150ms opacity transitions) and slight card lifts with shadow drops on hover.

## 3. Development Guidelines
- **Component Design**: Follow Next.js App router conventions. Use server components by default. Use `"use client"` only when necessary (e.g., global/local state toggles for modes).
- **Dependencies**: Do not install new dependencies (like Framer Motion, Axios, Prisma, etc.) without asking the user. Rely on the existing Tailwind config and Next.js features.
- **File Structure**:
  - `/app`: Pages and global layouts.
  - `/components`: Reusable UI components.
  - `/data`: Static data files (e.g., `papers.ts`).
- **CSS**: Use Tailwind CSS exclusively. No CSS modules or styled-components. Custom animations should be defined in `tailwind.config.ts` or `globals.css` if absolutely necessary.

## 4. Current Workflow
- To add a new paper: Generate the 3-level summaries using the designated prompt and add the entry to the `papers` array in `data/papers.ts`.
- Run locally with `npm run dev`.
