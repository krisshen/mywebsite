---
description: PaperRadar Daily Curation & Summarization Pipeline
---

# PaperRadar Daily Curation Workflow

This workflow guides the AI assistant and the user through the daily process of fetching, filtering, scoring, and summarizing AI papers for the PaperRadar project.

## 1. Data Retrieval Phase
// turbo
1. Run the fetch script to get the latest papers from arXiv:
   `python scripts/fetch_papers.py`
// turbo
2. Run the filter script to remove noise and out-of-scope papers:
   `python scripts/filter_papers.py`

## 2. AI Intelligence Phase (The "Editor-in-Chief")
3. **AI Task**: Open `data/papers_filtered.json` and read the titles and abstracts.
4. **Scoring Logic**: Use your internal knowledge to identify the Top 10 papers based on:
   - **Innovation**: New architectures or methods (e.g., specific CUDA kernels, hybrid models).
   - **Engineering Value**: Practical utility for developers or researchers.
   - **Impact**: Potential to shift the field.
5. **Update Scores**: Run `scripts/score_papers.py` to generate the shell file, then modify `data/top_10.json` or inform the user of your selection to be synced.

## 3. Summarization Phase (NotebookLM)
6. **Create Notebook**: Create a new NotebookLM notebook titled `PaperRadar Daily Curated (YYYY-MM-DD)`.
7. **Add Sources**: Add the PDF URLs of the selected 10 papers to the notebook.
8. **Generate Summaries**: Use the following prompt in the NotebookLM query:

> **NotebookLM Prompt**:
> "Please generate multi-level summaries in BOTH Chinese AND English for the 10 papers I just added. 
> For each paper, provide:
> 1. Expert Mode summary (Technical, for researchers) - in both Chinese and English
> 2. General Mode summary (Clear, for software engineers) - in both Chinese and English
> 3. Lazy Mode summary (Simple, for non-technical people) - in both Chinese and English
> 
> Output format for each paper:
> [Paper Title]
> Expert (Chinese): ...
> Expert (English): ...
> General (Chinese): ...
> General (English): ...
> Lazy (Chinese): ...
> Lazy (English): ...
> 
> Please use professional but accessible language in both languages."

## 4. Final Sync & Visuals
9. **Update Database**: Sync the generated summaries into `data/papers.ts` using the new script:
   `python scripts/sync_to_ts.py`
   *(AI Task: Populate the `SUMMARIES` dictionary in the script or pass them via a specialized logic block during execution)*
10. **Clean Up Ports**: If necessary, kill stuck dev server processes:
    `netstat -ano | findstr :3000`
    `taskkill /F /PID <PID>`
11. **Verify UI**: Run `npm run dev` and check the homepage at `http://localhost:3000`.

---
*Note: This workflow relies on the 'Hybrid Intelligence' model where the assistant provides the expert judgment for selection while scripts handle file operations.*