import json
import os
import tempfile

from flask import Blueprint, request, jsonify

from backend.config import DEFAULT_TOP_K, EMBEDDING_MODEL_NAME, SAMPLE_JOBS_PATH
from backend.services.embedding_service import embed_text
from backend.services.index_service import load_index, search
from backend.services.parser_service import extract_text

match_bp = Blueprint("match", __name__)

# Load job metadata once at import time (title/company for display).
_job_lookup = {}
for fname in os.listdir(SAMPLE_JOBS_PATH):
    if fname.endswith(".json"):
        with open(os.path.join(SAMPLE_JOBS_PATH, fname)) as f:
            job = json.load(f)
            _job_lookup[job["id"]] = job


@match_bp.route("/api/match", methods=["POST"])
def match_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400

    file = request.files["resume"]
    top_k = int(request.form.get("top_k", DEFAULT_TOP_K))

    with tempfile.NamedTemporaryFile(
        delete=False, suffix=os.path.splitext(file.filename)[1]
    ) as tmp:
        file.save(tmp.name)
        tmp_path = tmp.name

    try:
        resume_text = extract_text(tmp_path)
    finally:
        os.remove(tmp_path)

    if not resume_text.strip():
        return jsonify({"error": "Could not extract text from file"}), 422

    query_embedding = embed_text(resume_text)
    index, ids = load_index()
    raw_results = search(index, ids, query_embedding, top_k)

    matches = []
    for job_id, score in raw_results:
        job = _job_lookup.get(job_id, {})
        matches.append({
            "job_id": job_id,
            "title": job.get("title", "Unknown"),
            "company": job.get("company", "Unknown"),
            "similarity_score": round(score, 4),
        })

    return jsonify({
        "matches": matches,
        "resume_char_count": len(resume_text),
        "model_used": EMBEDDING_MODEL_NAME,
    })


@match_bp.route("/api/jobs", methods=["GET"])
def list_jobs():
    return jsonify(list(_job_lookup.values()))
