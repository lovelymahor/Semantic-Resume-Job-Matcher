import { useState } from "react";

/**
 * Minimal example component. Drop this into your existing Resume Extractor
 * React app and point API_URL at your Flask backend. Not a full app --
 * just enough to demo the upload -> ranked results flow.
 */
export default function MatchResults() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/match";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("top_k", 5);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setMatches(data.matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={!file || loading}>
          {loading ? "Matching..." : "Find Matching Jobs"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {matches.map((m) => (
          <li key={m.job_id}>
            <strong>{m.title}</strong> — {m.company} (score: {m.similarity_score})
          </li>
        ))}
      </ul>
    </div>
  );
}
