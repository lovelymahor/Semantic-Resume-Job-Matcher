import Card from "../common/Card";
import ResumeSummary from "./ResumeSummary";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";

/** Full structured view of the parsed resume returned by the backend. */
export default function ResumeViewer({ resume }) {
  if (!resume) return null;

  return (
    <div className="space-y-6">
      <ResumeSummary resume={resume} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-6">
          <SkillsSection skills={resume.skills} />
          <EducationSection education={resume.education} />
        </Card>
        <Card className="space-y-6">
          <ExperienceSection experience={resume.experience} />
          <ProjectsSection projects={resume.projects} />
        </Card>
      </div>
    </div>
  );
}
