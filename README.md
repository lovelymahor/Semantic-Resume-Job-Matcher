# Semantic Resume-Job Matcher

Ranks job descriptions against a resume by **semantic similarity** (sentence
embeddings + FAISS vector search) instead of keyword overlap — the same
weakness most ATS keyword filters have.

See `docs/ROADMAP.md` for the full build plan, day-by-day.

## Quick start

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r ../requirements.txt

# 1. Build the job index (run once, or whenever job data changes)
python scripts/build_index.py

# 2. Start the API
python app.py
```

API will be live at `http://localhost:5000`.

## Test it

```bash
curl -X POST http://localhost:5000/api/match \
  -F "resume=@data/sample_resumes/resume1.txt" \
  -F "top_k=5"
```

## Compare against the keyword baseline

```bash
python scripts/benchmark.py
```

This prints ranking overlap / divergence between TF-IDF keyword matching and
the semantic embedding approach — this comparison is your resume bullet's
evidence.

## Project layout

```
semantic-resume-matcher/
├── backend/
│   ├── app.py                     Flask app entrypoint
│   ├── config.py                  Paths, model name, constants
│   ├── routes/
│   │   └── match_routes.py        POST /api/match, /api/jobs
│   ├── services/
│   │   ├── embedding_service.py   Wraps sentence-transformers
│   │   ├── index_service.py       Wraps FAISS build/search/save/load
│   │   └── parser_service.py      Resume text extraction (reuse/extend your Resume Extractor)
│   ├── models/
│   │   └── schemas.py             Request/response dataclasses
│   ├── data/
│   │   ├── sample_resumes/        .txt resumes for local testing
│   │   ├── sample_jobs/           .json job descriptions
│   │   └── faiss_index/           Generated index + id map (gitignored)
│   ├── scripts/
│   │   ├── build_index.py         Offline: embed jobs -> build FAISS index
│   │   └── benchmark.py           TF-IDF baseline vs embeddings comparison
│   └── tests/
│       └── test_matching.py
├── frontend/                      Optional: reuse your Resume Extractor React app
│   └── src/components/
│       └── MatchResults.jsx       Example results-list component
├── requirements.txt
└── docs/
    └── ROADMAP.md                 Full day-by-day build plan
```
