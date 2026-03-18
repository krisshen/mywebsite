import json
import os

# Configuration
INPUT_FILE = "data/papers_raw.json"
OUTPUT_FILE = "data/papers_filtered.json"

# Rules
EXCLUDED_TITLES = ["Erratum", "Correction", "Workshop summary"]
REQUIRED_CATEGORIES = ['cs.AI', 'cs.LG', 'cs.CL', 'cs.CV', 'stat.ML']
MIN_ABSTRACT_LEN = 300

# Optional Rules: AI Keywords (at least one must be present if we want to be strict)
# We use case-insensitive matching
AI_KEYWORDS = [
    "llm", "transformer", "diffusion", "attention", "neural", "deep learning",
    "reinforcement learning", "agent", "language model", "vision", "latent",
    "reconstruction", "generative", "multimodal", "fine-tuning", "inference"
]

def filter_papers():
    if not os.path.exists(INPUT_FILE):
        print(f"Input file {INPUT_FILE} not found. Please run fetch_papers.py first.")
        return

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        papers = json.load(f)

    total_count = len(papers)
    filtered_papers = []

    for paper in papers:
        # Rule 1: Exclude by title keywords
        if any(keyword.lower() in paper['title'].lower() for keyword in EXCLUDED_TITLES):
            continue
        
        # Rule 2: Check categories (must have at least one of REQUIRED_CATEGORIES)
        # Note: arXiv categories are like 'cs.CV', 'cs.LG' etc.
        if not any(cat in REQUIRED_CATEGORIES for cat in paper['categories']):
            continue

        # Rule 3: Abstract length check
        if len(paper['summary']) < MIN_ABSTRACT_LEN:
            continue

        # Rule 4: Optional AI keyword filtering (heuristic)
        abstract_title_combined = (paper['title'] + " " + paper['summary']).lower()
        if not any(kw.lower() in abstract_title_combined for kw in AI_KEYWORDS):
            # If it's a niche math paper without common AI keywords, we might skip it
            continue

        filtered_papers.append(paper)

    # Save results
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(filtered_papers, f, indent=4, ensure_ascii=False)

    print(f"--- Filtering Summary ---")
    print(f"Total Papers Raw: {total_count}")
    print(f"Remaining after filtering: {len(filtered_papers)}")
    print(f"Filtered out: {total_count - len(filtered_papers)} ({(total_count - len(filtered_papers))/total_count:.1%})")
    print(f"Result saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    filter_papers()
