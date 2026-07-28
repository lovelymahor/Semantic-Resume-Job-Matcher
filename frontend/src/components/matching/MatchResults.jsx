import { useState } from "react";
import MatchSummary from "./MatchSummary";
import TopMatches from "./TopMatches";
import RankingTable from "./RankingTable";
import SearchBar from "../common/SearchBar";

/** Composes the full results view: summary → cards → ranking table. */
export default function MatchResults({ matches = [], stats }) {
  const [query, setQuery] = useState("");

  const filtered = matches.filter((match) =>
    `${match.title} ${match.company} ${(match.matched_skills || []).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <MatchSummary stats={stats} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Top matching jobs</h2>
        <div className="w-full sm:w-72">
          <SearchBar value={query} onChange={setQuery} placeholder="Filter matches…" />
        </div>
      </div>
      <TopMatches matches={filtered} />
      <RankingTable matches={filtered} />
    </div>
  );
}
