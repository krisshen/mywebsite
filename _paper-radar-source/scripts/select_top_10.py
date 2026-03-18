import json
import os
import argparse

def select_top_10(input_file: str, output_file: str):
    """
    Selects the top 10 papers based on score.
    """
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found.")
        return

    with open(input_file, "r", encoding="utf-8") as f:
        scored_papers = json.load(f)

    # Sort by score descending
    sorted_papers = sorted(scored_papers, key=lambda x: x["score"], reverse=True)

    # Take top 10
    top_10 = sorted_papers[:10]

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(top_10, f, indent=4, ensure_ascii=False)

    print(f"Selected top {len(top_10)} papers and saved to {output_file}")
    for i, paper in enumerate(top_10):
        print(f"{i+1}. [{paper['score']}] {paper['title']}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Select top 10 papers")
    parser.add_argument("--input", default="data/papers_scored.json", help="Input scored JSON")
    parser.add_argument("--output", default="data/top_10.json", help="Output top 10 JSON")
    
    args = parser.parse_args()
    select_top_10(args.input, args.output)
