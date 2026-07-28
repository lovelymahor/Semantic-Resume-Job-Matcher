import PageContainer from "../components/layout/PageContainer";
import Card, { CardHeader } from "../components/common/Card";
import Badge from "../components/common/Badge";
import { PIPELINE_STAGES, TECH_STACK } from "../utils/constants";

export default function About() {
  return (
    <PageContainer
      sidebar
      eyebrow="Project"
      title="About this system"
      description="A portfolio-grade demonstration of semantic retrieval applied to recruiting."
    >
      <div className="space-y-6">
        <Card>
          <CardHeader title="Why semantic matching" subtitle="Keyword search misses meaning." />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Traditional applicant tracking systems rank resumes with TF-IDF or plain keyword overlap, so a
            candidate who writes “vector database” is invisible to a posting that says “embedding store”.
            This project encodes both documents with a transformer model, then compares them in vector
            space — synonyms, paraphrases and related concepts land close together.
          </p>
        </Card>

        <Card>
          <CardHeader title="Architecture" subtitle="React frontend · Flask REST API · FAISS index" />
          <ol className="space-y-3">
            {PIPELINE_STAGES.map((stage, index) => (
              <li key={stage.key} className="flex gap-4 rounded-xl border border-border bg-secondary/30 p-4">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <div>
                  <p className="text-sm font-medium">{stage.label}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <CardHeader title="Tech stack" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((group) => (
              <div key={group.group}>
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{group.group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
