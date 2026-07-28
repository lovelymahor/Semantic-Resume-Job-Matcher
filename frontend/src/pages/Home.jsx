import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Database, GitCompare, Layers, Sparkles, Zap } from "lucide-react";
import Button from "../components/common/Button";
import Card, { CardHeader } from "../components/common/Card";
import Badge from "../components/common/Badge";
import { PIPELINE_STAGES, TECH_STACK } from "../utils/constants";

const features = [
  { icon: Cpu, title: "Sentence embeddings", text: "all-MiniLM-L6-v2 encodes resumes and job descriptions into a shared 384-d space." },
  { icon: Database, title: "FAISS vector index", text: "IndexFlatIP performs exact cosine-similarity nearest-neighbour search." },
  { icon: GitCompare, title: "Semantic vs TF-IDF", text: "A built-in benchmark shows where lexical retrieval falls apart." },
  { icon: Layers, title: "Skill gap analysis", text: "Each match is diffed against your resume to surface missing skills." },
];

export default function Home() {
  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Badge tone="primary" icon={Sparkles} className="mx-auto">
            Flask · FAISS · Sentence Transformers
          </Badge>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Match resumes to jobs by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              meaning, not keywords
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Upload a resume and the Python backend embeds it, searches a FAISS index of job descriptions
            and returns ranked matches with similarity scores and skill gaps.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to="/upload" size="lg">
              Upload resume <ArrowRight className="size-4" />
            </Button>
            <Button as={Link} to="/benchmark" variant="outline" size="lg">
              See the benchmark
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card hover className="h-full">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <Card>
          <CardHeader title="How the pipeline runs" subtitle="Every upload flows through these backend stages." icon={Zap} />
          <ol className="grid gap-4 md:grid-cols-3">
            {PIPELINE_STAGES.map((stage, index) => (
              <li key={stage.key} className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="font-mono text-xs text-primary">0{index + 1}</p>
                <p className="mt-2 text-sm font-medium">{stage.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK.map((group) => (
            <Card key={group.group}>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{group.group}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
