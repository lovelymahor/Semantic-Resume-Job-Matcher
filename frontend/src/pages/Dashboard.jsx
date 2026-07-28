import { BarChart3, FileUp, Layers, Target } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCards from "../components/dashboard/DashboardCards";
import RecentUploads from "../components/dashboard/RecentUploads";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import { useMatch } from "../hooks/useMatch";
import { useMatchContext } from "../context/MatchContext";
import { formatPercent } from "../utils/formatters";

export default function Dashboard() {
  const { stats } = useMatch();
  const { history } = useMatchContext();

  const cards = [
    { label: "Runs this session", value: history.length, icon: FileUp, hint: "Client-side only" },
    { label: "Jobs matched", value: stats.total, icon: Layers },
    { label: "Top similarity", value: formatPercent(stats.top), icon: Target, tone: "accent" },
    { label: "Average score", value: formatPercent(stats.average), icon: BarChart3, tone: "accent" },
  ];

  return (
    <PageContainer
      sidebar
      eyebrow="Overview"
      title="Dashboard"
      description="A snapshot of the current session plus live analytics pulled from the Flask API."
    >
      <div className="space-y-8">
        <DashboardStats stats={cards} />
        <DashboardCards />
        <RecentUploads history={history} />
        <AnalyticsOverview />
      </div>
    </PageContainer>
  );
}
