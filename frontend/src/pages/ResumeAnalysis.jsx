import PageContainer from "../components/layout/PageContainer";
import ResumeViewer from "../components/resume/ResumeViewer";
import EmptyState from "../components/common/EmptyState";
import { useMatch } from "../hooks/useMatch";

export default function ResumeAnalysis() {
  const { resume } = useMatch();

  return (
    <PageContainer
      sidebar
      eyebrow="Parsed output"
      title="Resume analysis"
      description="Structured fields extracted by the backend parser before embedding."
    >
      {resume ? (
        <ResumeViewer resume={resume} />
      ) : (
        <EmptyState title="Nothing parsed yet" description="Upload a resume to see the extracted structure." />
      )}
    </PageContainer>
  );
}
