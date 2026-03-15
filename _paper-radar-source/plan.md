# PaperRadar Development Plan

## Status Overview
Based on the MVP v2 definition and the current codebase state, the Phase 1 development is successfully structured. The core features, including the Next.js scaffold, 3-level difficulty toggling (Expert, General, Lazy), paper cards, and the static data structure in `data/papers.ts`, are fully functional. We currently have 3 sample papers populated in our local data.

## Phase 1: MVP Finalization (Current week)
- [x] **Day 1-2**: Setup Next.js, implement UI components (Header, ModeSwitcher, PaperCard, Footer, Layout).
- [x] **Day 1-2**: Implement global and local state synchronization for summary reading difficulties.
- [x] **Day 3-4**: Test the summary generation prompt, curate and accumulate 10 high-quality paper samples in `data/papers.ts` via NotebookLM.
- [ ] **Day 5-7**: Deploy the application to Vercel. Ensure static export (`npm run build`) works perfectly and performance is optimal. Begin the daily update routine.

## Automated Pipeline (Active Development)
To minimize token usage and improve efficiency, we are automating the curation process:
- [x] `scripts/fetch_papers.py`: Fetches latest papers from arXiv API.
- [x] `scripts/filter_papers.py`: Filters papers based on title, category, and abstract length.
- [x] `scripts/score_papers.py`: (Prototype) Scoring filtered papers (aided by AI assistant).
- [x] `scripts/select_top_10.py`: Sorting and selecting top 10 candidates.
- [x] `NotebookLM Integration`: Batch summary generation for 3 modes (Expert, General, Lazy).
- [x] `data/papers.ts`: Automatically populated with curated data.

## Phase 2: Launch & Marketing (Next week)
- [ ] **Day 8-10**: Record a demonstration video highlighting the core value proposition: the seamless switching between Expert, General, and Lazy reading modes.
- [ ] **Day 11-14**: Publish the video on relevant platforms (e.g., Twitter/X, Reddit, specialized AI communities).
- [ ] **Day 11-14**: Collect user feedback to validate the core assumption (users need varying levels of AI paper summaries, and this manual static site solves their problem).

## Future Considerations (Post-MVP)
*Note: Do NOT implement these until Phase 2 feedback justifies the necessity and investment.*
- arXiv RSS automatic fetching
- Database storage and integration
- Email newsletter subscriptions
- Trend statistics tracking
- User accounts / Authentication systems
- Multi-tag filtering and search functionality
- Historical archive pages
