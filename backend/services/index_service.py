"""
Thin wrapper around FAISS. Uses IndexFlatIP (inner product) on normalized
vectors, which is mathematically equivalent to cosine similarity -- exact
search, no approximation, which is the right choice at this dataset size
(hundreds-to-low-thousands of jobs). If this were millions of jobs, you'd
swap in IndexIVFFlat or HNSW here -- worth mentioning in an interview even
if you don't need it yet.
"""

import json
import os
import faiss
import numpy as np

from backend.config import INDEX_DIR, INDEX_PATH, ID_MAP_PATH, EMBEDDING_DIM


def build_index(embeddings, ids):
    """
    embeddings: numpy array (n, EMBEDDING_DIM), L2-normalized
    ids: list of job identifiers, same order as embeddings
    """
    index = faiss.IndexFlatIP(EMBEDDING_DIM)
    index.add(embeddings.astype(np.float32))
    return index, ids


def save_index(index, ids):
    os.makedirs(INDEX_DIR, exist_ok=True)
    faiss.write_index(index, INDEX_PATH)
    with open(ID_MAP_PATH, "w") as f:
        json.dump(ids, f)


def load_index():
    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError(
            "No index found. Run `python scripts/build_index.py` first."
        )
    index = faiss.read_index(INDEX_PATH)
    with open(ID_MAP_PATH) as f:
        ids = json.load(f)
    return index, ids


def search(index, ids, query_embedding, top_k):
    """
    query_embedding: numpy array shape (EMBEDDING_DIM,), L2-normalized
    returns: list of (job_id, similarity_score) sorted descending
    """
    query = np.expand_dims(query_embedding.astype(np.float32), axis=0)
    scores, indices = index.search(query, top_k)
    results = []
    for score, idx in zip(scores[0], indices[0]):
        if idx == -1:
            continue
        results.append((ids[idx], float(score)))
    return results
