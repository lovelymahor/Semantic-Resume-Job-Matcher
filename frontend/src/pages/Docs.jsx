import PageContainer from "../components/layout/PageContainer";
import Card, { CardHeader } from "../components/common/Card";
import Badge from "../components/common/Badge";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";

const endpoints = [
  { method: "GET", path: API_ENDPOINTS.jobs, description: "List every job description in the index." },
  { method: "POST", path: API_ENDPOINTS.upload, description: "Upload a resume file (multipart/form-data, field: resume)." },
  { method: "POST", path: API_ENDPOINTS.match, description: "Run the match pipeline. Accepts a file or raw resume text." },
  { method: "GET", path: API_ENDPOINTS.benchmark, description: "Semantic vs TF-IDF evaluation metrics." },
  { method: "GET", path: API_ENDPOINTS.analytics, description: "Score distribution, trends, skill-gap aggregates." },
];

export default function Docs() {
  return (
    <PageContainer
      sidebar
      eyebrow="Reference"
      title="API documentation"
      description="The endpoints this frontend consumes from the existing Flask backend."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader title="Base URL" subtitle="Override with the VITE_API_BASE_URL environment variable." />
          <code className="block rounded-xl border border-border bg-secondary/40 px-4 py-3 font-mono text-sm text-primary">
            {API_BASE_URL}
          </code>
        </Card>

        <Card>
          <CardHeader title="Endpoints" />
          <ul className="space-y-3">
            {endpoints.map((endpoint) => (
              <li key={endpoint.path} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4">
                <Badge tone={endpoint.method === "GET" ? "primary" : "accent"}>{endpoint.method}</Badge>
                <code className="font-mono text-sm">{endpoint.path}</code>
                <span className="text-sm text-muted-foreground">{endpoint.description}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Offline behaviour" subtitle="What happens when the Flask server is not running." />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every request goes through a fetch wrapper with a demo fallback. If the API is unreachable the UI
            renders a representative sample response and flags it with a{" "}
            <Badge tone="warning">Demo data</Badge> label, so the interface stays explorable without a backend.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
