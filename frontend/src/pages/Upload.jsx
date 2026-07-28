import PageContainer from "../components/layout/PageContainer";
import UploadArea from "../components/upload/UploadArea";

export default function Upload() {
  return (
    <PageContainer
      sidebar
      eyebrow="Step 01"
      title="Upload resume"
      description="PDF, DOCX or TXT up to 5 MB. The file is posted to the Flask API and processed by the semantic pipeline."
    >
      <UploadArea />
    </PageContainer>
  );
}
