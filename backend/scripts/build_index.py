"""
Run this whenever job postings change. Embeds every job description in
data/sample_jobs/ and writes a FAISS index + id map to data/faiss_index/.

Usage:
    python scripts/build_index.py
"""

import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.config import SAMPLE_JOBS_PATH
from backend.services.embedding_service import embed_texts
from backend.services.index_service import build_index, save_index


def main():
    job_files = [f for f in os.listdir(SAMPLE_JOBS_PATH) if f.endswith(".json")]
    if not job_files:
        print(f"No job files found in {SAMPLE_JOBS_PATH}")
        return

    ids, texts = [], []
    for fname in job_files:
        with open(os.path.join(SAMPLE_JOBS_PATH, fname)) as f:
            job = json.load(f)
            ids.append(job["id"])
            # Weight title higher by repeating it -- a cheap, defensible trick
            # for tilting semantic similarity toward role relevance.
            texts.append(f"{job['title']}. {job['title']}. {job['description']}")

    print(f"Embedding {len(texts)} job postings...")
    embeddings = embed_texts(texts)

    print("Building FAISS index...")
    index, ids = build_index(embeddings, ids)
    save_index(index, ids)

    print(f"Done. Indexed {len(ids)} jobs -> data/faiss_index/")


if __name__ == "__main__":
    main()
