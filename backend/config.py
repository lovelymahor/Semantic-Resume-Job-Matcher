import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Embedding model. all-MiniLM-L6-v2 is small (~80MB), fast on CPU, and a
# common, defensible choice to name in an interview.
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
EMBEDDING_DIM = 384  # must match the model's output dimension

# Data locations
SAMPLE_JOBS_PATH = os.path.join(BASE_DIR, "data", "sample_jobs")
SAMPLE_RESUMES_PATH = os.path.join(BASE_DIR, "data", "sample_resumes")

INDEX_DIR = os.path.join(BASE_DIR, "data", "faiss_index")
INDEX_PATH = os.path.join(INDEX_DIR, "jobs.index")
ID_MAP_PATH = os.path.join(INDEX_DIR, "id_map.json")

DEFAULT_TOP_K = 5
