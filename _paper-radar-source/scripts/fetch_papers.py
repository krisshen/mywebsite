# /// script
# dependencies = [
#   "feedparser",
#   "requests",
# ]
# ///

import feedparser
import requests
import json
import os
from datetime import datetime

# arXiv API configuration
CATEGORIES = ['cs.AI', 'cs.LG', 'cs.CL', 'cs.CV', 'stat.ML']
MAX_RESULTS = 250
URL_BASE = "http://export.arxiv.org/api/query?"


def fetch_papers():
    # Construct search query
    category_query = "+OR+".join([f"cat:{cat}" for cat in CATEGORIES])
    query = f"search_query={category_query}&sortBy=submittedDate&sortOrder=descending&max_results={MAX_RESULTS}"
    url = f"{URL_BASE}{query}"

    print(f"Fetching papers from: {url}")
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching data: {response.status_code}")
        return []

    # Parse response
    feed = feedparser.parse(response.content)
    
    papers_metadata = []
    for entry in feed.entries:
        # Extract ID and construct arXiv URLs
        # entry.id is usually http://arxiv.org/abs/xxxx.xxxxxvX
        paper_id = entry.id.split('/abs/')[-1]
        arxiv_url = f"https://arxiv.org/abs/{paper_id}"
        
        # Get PDF URL - look for 'application/pdf' type
        pdf_url = ""
        for link in entry.links:
            if link.get('type') == 'application/pdf':
                pdf_url = link.get('href')
                break
        
        # Fallback for PDF URL if not found by type
        if not pdf_url:
            pdf_url = f"https://arxiv.org/pdf/{paper_id}.pdf"
        
        paper = {
            "id": paper_id,
            "title": entry.title.replace('\n', ' ').strip(),
            "authors": [a.name for a in entry.authors], # Store as list
            "summary": entry.summary.replace('\n', ' ').strip(),
            "categories": [t.get('term') for t in entry.tags],
            "published": entry.published,
            "updated": entry.updated,
            "arxiv_url": arxiv_url,
            "pdf_url": pdf_url
        }
        papers_metadata.append(paper)
    
    return papers_metadata


def save_to_json(data, filename="data/papers_raw.json"):
    # Ensure director exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    
    print(f"Successfully saved {len(data)} papers to {filename}")


if __name__ == "__main__":
    papers = fetch_papers()
    if papers:
        save_to_json(papers)
    else:
        print("No papers fetched.")
