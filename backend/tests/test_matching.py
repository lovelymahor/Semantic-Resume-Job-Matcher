"""
Basic tests for the embedding + index pipeline. Run with:
    pytest backend/tests/
"""

import sys
import os
import numpy as np

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.services.embedding_service import embed_texts
from backend.services.index_service import build_index, search


def test_embeddings_are_normalized():
    embeddings = embed_texts(["hello world", "goodbye world"])
    norms = np.linalg.norm(embeddings, axis=1)
    assert np.allclose(norms, 1.0, atol=1e-5)


def test_identical_text_scores_highest():
    texts = [
        "Backend engineer with Python and Flask experience",
        "Frontend designer skilled in CSS and Figma",
        "Backend engineer with Python and Flask experience",
    ]
    embeddings = embed_texts(texts)
    index, ids = build_index(embeddings, ids=["job_a", "job_b", "job_c"])

    query = embeddings[0]  # same text as job_a and job_c
    results = search(index, ids, query, top_k=3)

    top_id, top_score = results[0]
    assert top_id in ("job_a", "job_c")
    assert top_score > 0.99


def test_dissimilar_text_scores_lower():
    texts = [
        "Backend engineer with Python and Flask experience",
        "Frontend designer skilled in CSS and Figma",
    ]
    embeddings = embed_texts(texts)
    index, ids = build_index(embeddings, ids=["job_a", "job_b"])

    query = embeddings[0]
    results = search(index, ids, query, top_k=2)

    scores = dict(results)
    assert scores["job_a"] > scores["job_b"]
