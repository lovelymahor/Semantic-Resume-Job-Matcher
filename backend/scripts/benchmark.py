"""
Compares TF-IDF keyword-overlap ranking against the semantic embedding
ranking for each sample resume, against the same set of jobs.

This is the script that generates the actual evidence for your resume
bullet -- run it, read the printed output, and use real numbers from it.
Do not estimate or make up the comparison numbers; run this and report
what it actually says.

Usage:
    python scripts/benchmark.py
"""

import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from backend.config import SAMPLE_JOBS_PATH, SAMPLE_RESUMES_PATH
from backend.services.embedding_service import embed_texts
from backend.services.parser_service import extract_text


def load_jobs():
    jobs = []
    for fname in os.listdir(SAMPLE_JOBS_PATH):
        if fname.endswith(".json"):
            with open(os.path.join(SAMPLE_JOBS_PATH, fname)) as f:
                jobs.append(json.load(f))
    return jobs


def load_resumes():
    resumes = []
    for fname in os.listdir(SAMPLE_RESUMES_PATH):
        path = os.path.join(SAMPLE_RESUMES_PATH, fname)
        resumes.append({"name": fname, "text": extract_text(path)})
    return resumes


def tfidf_rank(resume_text, job_texts):
    vectorizer = TfidfVectorizer(stop_words="english")
    all_texts = [resume_text] + job_texts
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    sims = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    return sims


def semantic_rank(resume_text, job_texts):
    all_embeddings = embed_texts([resume_text] + job_texts)
    resume_emb = all_embeddings[0]
    job_embs = all_embeddings[1:]
    sims = job_embs @ resume_emb  # normalized vectors -> dot product = cosine
    return sims


def main():
    jobs = load_jobs()
    resumes = load_resumes()
    job_texts = [f"{j['title']}. {j['description']}" for j in jobs]
    job_titles = [j["title"] for j in jobs]

    for resume in resumes:
        print(f"\n=== {resume['name']} ===")

        tfidf_scores = tfidf_rank(resume["text"], job_texts)
        semantic_scores = semantic_rank(resume["text"], job_texts)

        tfidf_ranking = sorted(
            zip(job_titles, tfidf_scores), key=lambda x: -x[1]
        )
        semantic_ranking = sorted(
            zip(job_titles, semantic_scores), key=lambda x: -x[1]
        )

        print("TF-IDF (keyword) top matches:")
        for title, score in tfidf_ranking[:3]:
            print(f"  {score:.3f}  {title}")

        print("Semantic (embedding) top matches:")
        for title, score in semantic_ranking[:3]:
            print(f"  {score:.3f}  {title}")

        top_tfidf_titles = {t for t, _ in tfidf_ranking[:3]}
        top_semantic_titles = {t for t, _ in semantic_ranking[:3]}
        overlap = len(top_tfidf_titles & top_semantic_titles)
        print(f"Overlap in top-3 between methods: {overlap}/3")


if __name__ == "__main__":
    main()
