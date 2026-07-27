# Roadmap: Semantic Resume-Job Matcher

Realistic timeline: **5–7 focused days** if you already know Flask (you do,
from Job Portal and Resume Extractor). Each phase below has a clear
done-condition so you know when to move on.

---

## Phase 0 — Setup (30–60 min)
- Clone/create the project structure (already scaffolded for you).
- `pip install -r requirements.txt`
- Confirm `sentence-transformers` downloads the model successfully:
  ```python
  from sentence_transformers import SentenceTransformer
  m = SentenceTransformer("all-MiniLM-L6-v2")
  print(m.encode(["hello"]).shape)  # should print (1, 384)
  ```
**Done when:** the model loads and encodes without error.

## Phase 1 — Embeddings + Index (Day 1)
- Read `backend/services/embedding_service.py` and `index_service.py` —
  understand *why* embeddings are L2-normalized (so inner product = cosine
  similarity) and why `IndexFlatIP` is the right FAISS index type at this
  scale (exact search, no approximation needed under ~100k vectors).
- Run `python scripts/build_index.py` against the 4 sample jobs provided.
- Confirm `data/faiss_index/jobs.index` and `id_map.json` get created.
**Done when:** the index builds without error and contains 4 vectors.

## Phase 2 — API (Day 2)
- Start the Flask app: `python app.py`
- Test the `/api/match` endpoint with one of the sample resumes:
  ```bash
  curl -X POST http://localhost:5000/api/match \
    -F "resume=@data/sample_resumes/resume2.txt" \
    -F "top_k=3"
  ```
- Confirm resume2 (ML-leaning) ranks the "Machine Learning Engineer" job
  highest, and resume1 (backend-leaning) ranks "Backend Software Engineer"
  highest. If it doesn't, that's your first real debugging story —
  investigate before moving on, don't just accept wrong output.
**Done when:** rankings are sane and match what a human would expect.

## Phase 3 — Baseline comparison (Day 3)
- Run `python scripts/benchmark.py`
- Read the printed TF-IDF vs semantic rankings for both sample resumes.
- **This is the step that generates your actual resume bullet's evidence.**
  Do not skip it and do not estimate the numbers — run it and record what
  it actually outputs. A real, small, honestly-reported difference is far
  more credible in an interview than an invented big one.
**Done when:** you can describe, with real output in front of you, at
least one concrete case where semantic search found a relevant job that
keyword search missed (or vice versa — that's equally worth reporting).

## Phase 4 — Your own data (Day 4)
- Replace the 4 sample jobs with 15–30 real job postings (scrape or
  hand-copy from LinkedIn/Indeed listings in your target roles — check the
  site's terms of service before scraping at any real volume).
- Test your *own* resume (or the Job Portal / Resume Extractor project
  descriptions) against this larger set.
- Rebuild the index: `python scripts/build_index.py`
**Done when:** you're getting rankings against a realistic-sized job set,
not just 4 toy examples.

## Phase 5 — Frontend (Day 5, optional but recommended)
- Drop `frontend/src/components/MatchResults.jsx` into your existing React
  app from the Resume Extractor project (reuse, don't rebuild).
- Wire up the upload button, display ranked results with company/title/score.
**Done when:** you can demo this live in an interview by uploading a file
and watching ranked results appear — a working demo is worth more than any
line on the resume.

## Phase 6 — Polish + write-up (Day 6–7)
- Add 2–3 more tests to `backend/tests/test_matching.py` covering edge
  cases (empty resume, resume with no overlapping vocabulary with any job).
- Write a short `NOTES.md` for yourself: what design decisions you made and
  why (e.g. "chose IndexFlatIP over approximate search because dataset is
  small," "weighted job titles 2x in the embedding text to bias toward role
  relevance"). This is exactly what an interviewer will ask about — write
  it down while it's fresh so you don't have to reconstruct it under
  pressure.
- Deploy if you have time (Render/Railway free tier for the Flask API).

---

## Stretch goals (only if Phase 0–6 are solid)
- Swap `IndexFlatIP` for `IndexHNSWFlat` and benchmark query latency at
  different `M` values — gives you a real "I understand the
  accuracy/speed tradeoff" talking point.
- Add a re-ranking step: take FAISS's top 20 results, then re-score with a
  more expensive cross-encoder model for the final top 5 — a real
  production pattern (two-stage retrieval).
- Connect this to your Resume Extractor: instead of embedding raw resume
  text, embed the *structured* fields (skills section weighted higher than
  the rest) — requires wiring `parser_service.py` to your existing regex
  extraction logic.

## What NOT to do
- Don't fabricate benchmark numbers if you skip Phase 3 — an interviewer
  asking "how much better was semantic search?" with no real answer behind
  it is worse than not having the project.
- Don't scale-brag ("handles millions of documents") unless you actually
  tested at that scale. Say what you tested, not what you assume it could
  do.
