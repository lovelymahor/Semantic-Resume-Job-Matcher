/**
 * Global constants + demo fallback data.
 *
 * DEMO_* payloads are only rendered when the Flask API is unreachable
 * (e.g. local frontend without backend or static deployment).
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export const API_ENDPOINTS = {
  jobs: "/api/jobs",
  upload: "/api/upload",
  match: "/api/match",
  benchmark: "/api/benchmark",
  analytics: "/api/analytics",
};

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "text/plain": [".txt"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const PIPELINE_STAGES = [
  { key: "parse", label: "Parsing Resume", detail: "pdfplumber / docx2txt text extraction" },
  { key: "clean", label: "Cleaning Text", detail: "lowercasing, stopwords, lemmatization" },
  { key: "embed", label: "Generating Embeddings", detail: "sentence-transformers · all-MiniLM-L6-v2" },
  { key: "faiss", label: "Searching FAISS", detail: "IndexFlatIP cosine similarity search" },
  { key: "rank", label: "Ranking Jobs", detail: "top-k ordering + skill gap diff" },
  { key: "done", label: "Finished", detail: "response serialized to JSON" },
];

export const TECH_STACK = [
  { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Recharts", "Framer Motion"] },
  { group: "Backend", items: ["Python", "Flask", "REST API"] },
  { group: "ML / NLP", items: ["sentence-transformers", "MiniLM-L6-v2", "spaCy", "scikit-learn"] },
  { group: "Vector Search", items: ["FAISS", "NumPy", "Cosine Similarity"] },
];

export const DEMO_MATCH = {
  demo: true,
  resume: {
    name: "Sample Candidate",
    title: "Machine Learning Engineer",
    summary:
      "Backend and ML engineer focused on semantic search, vector databases and production Python services.",
    skills: ["Python", "Flask", "FAISS", "PyTorch", "NLP", "Docker", "SQL", "REST APIs"],
    education: [
      { degree: "B.Tech, Computer Science", school: "National Institute of Technology", year: "2023" },
    ],
    experience: [
      { role: "ML Engineer", company: "VectorLabs", period: "2023 — Present", summary: "Built retrieval pipelines over 1M+ embeddings." },
      { role: "Backend Intern", company: "DataForge", period: "2022 — 2023", summary: "Flask microservices and ETL jobs." },
    ],
    projects: [
      { name: "Semantic Resume Matcher", stack: "Flask · FAISS · MiniLM", summary: "Resume to job-description retrieval engine." },
      { name: "Docs QA Bot", stack: "Python · RAG", summary: "Chunked embedding search over technical docs." },
    ],
  },
  matches: [
    {
      id: 1,
      rank: 1,
      title: "Machine Learning Engineer",
      company: "Nimbus AI",
      location: "Remote",
      score: 0.912,
      matched_skills: ["Python", "PyTorch", "NLP", "FAISS"],
      missing_skills: ["Kubernetes", "Ray"],
      description:
        "Design and ship retrieval systems using sentence embeddings and approximate nearest neighbour indexes.",
    },
    {
      id: 2,
      rank: 2,
      title: "NLP Engineer",
      company: "Lexica Systems",
      location: "Bengaluru, IN",
      score: 0.874,
      matched_skills: ["NLP", "Python", "REST APIs"],
      missing_skills: ["Spark", "Airflow"],
      description:
        "Build text cleaning, tokenization and embedding pipelines for large document corpora.",
    },
    {
      id: 3,
      rank: 3,
      title: "Backend Engineer (AI Platform)",
      company: "Corevault",
      location: "Berlin, DE",
      score: 0.831,
      matched_skills: ["Flask", "Docker", "SQL"],
      missing_skills: ["Go", "gRPC"],
      description:
        "Own Python services powering model inference endpoints and vector search APIs.",
    },
    {
      id: 4,
      rank: 4,
      title: "Data Scientist",
      company: "Helio Analytics",
      location: "Remote",
      score: 0.762,
      matched_skills: ["Python", "SQL"],
      missing_skills: ["Tableau", "A/B Testing"],
      description: "Analyse product data and build predictive models for retention.",
    },
    {
      id: 5,
      rank: 5,
      title: "Search Engineer",
      company: "Findly",
      location: "Amsterdam, NL",
      score: 0.718,
      matched_skills: ["FAISS", "Python"],
      missing_skills: ["Elasticsearch", "Java"],
      description: "Improve relevance ranking across hybrid lexical and semantic retrieval.",
    },
  ],
};

export const DEMO_BENCHMARK = {
  demo: true,
  metrics: [
    { metric: "Precision@5", semantic: 0.86, tfidf: 0.61 },
    { metric: "Recall@10", semantic: 0.81, tfidf: 0.58 },
    { metric: "MRR", semantic: 0.79, tfidf: 0.52 },
    { metric: "nDCG", semantic: 0.84, tfidf: 0.6 },
  ],
  speed: [
    { stage: "Embedding", semantic: 38, tfidf: 6 },
    { stage: "Index Search", semantic: 4, tfidf: 21 },
    { stage: "Ranking", semantic: 3, tfidf: 5 },
  ],
  accuracy: [
    { k: "k=1", semantic: 0.9, tfidf: 0.64 },
    { k: "k=3", semantic: 0.88, tfidf: 0.62 },
    { k: "k=5", semantic: 0.86, tfidf: 0.61 },
    { k: "k=10", semantic: 0.82, tfidf: 0.55 },
  ],
  ranking_difference: [
    { job: "ML Engineer", semantic_rank: 1, tfidf_rank: 4 },
    { job: "NLP Engineer", semantic_rank: 2, tfidf_rank: 1 },
    { job: "Backend Engineer", semantic_rank: 3, tfidf_rank: 6 },
    { job: "Data Scientist", semantic_rank: 4, tfidf_rank: 2 },
    { job: "Search Engineer", semantic_rank: 5, tfidf_rank: 8 },
  ],
};

export const DEMO_ANALYTICS = {
  demo: true,
  score_distribution: [
    { name: "0.9 – 1.0", value: 1 },
    { name: "0.8 – 0.9", value: 2 },
    { name: "0.7 – 0.8", value: 2 },
    { name: "< 0.7", value: 5 },
  ],
  match_trend: [
    { run: "Run 1", score: 0.71 },
    { run: "Run 2", score: 0.76 },
    { run: "Run 3", score: 0.8 },
    { run: "Run 4", score: 0.85 },
    { run: "Run 5", score: 0.91 },
  ],
  skill_radar: [
    { skill: "NLP", resume: 90, market: 80 },
    { skill: "Python", resume: 95, market: 92 },
    { skill: "MLOps", resume: 55, market: 85 },
    { skill: "Cloud", resume: 60, market: 88 },
    { skill: "Databases", resume: 75, market: 78 },
  ],
  skill_gap: [
    { skill: "Kubernetes", frequency: 8 },
    { skill: "Airflow", frequency: 6 },
    { skill: "Spark", frequency: 5 },
    { skill: "Go", frequency: 3 },
    { skill: "gRPC", frequency: 2 },
  ],
};

export const DEMO_JOBS = DEMO_MATCH.matches;
