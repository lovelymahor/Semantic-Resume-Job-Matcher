import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import SearchBar from "../components/common/SearchBar";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import Modal from "../components/common/Modal";
import JobCard from "../components/jobs/JobCard";
import JobDetails from "../components/jobs/JobDetails";
import Badge from "../components/common/Badge";
import { useJobs } from "../hooks/useJobs";

export default function Jobs() {
  const { jobs, loading, error, isDemo, reload } = useJobs();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location || ""}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <PageContainer
      sidebar
      eyebrow="Corpus"
      title="Indexed jobs"
      description="Every job description currently stored in the FAISS index."
      actions={isDemo ? <Badge tone="warning">Demo data</Badge> : null}
    >
      <div className="mb-6 max-w-md">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <Loader label="Loading jobs" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onSelect={setSelected} />
          ))}
        </div>
      )}

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Job description">
        <JobDetails job={selected} />
      </Modal>
    </PageContainer>
  );
}
