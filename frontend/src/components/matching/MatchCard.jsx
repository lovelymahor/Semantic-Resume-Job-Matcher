import { motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import ScoreBadge from "./ScoreBadge";
import SimilarityBar from "./SimilarityBar";
import MissingSkills from "../jobs/MissingSkills";
import { formatRank } from "../../utils/formatters";
import { truncate } from "../../utils/helpers";

export default function MatchCard({ match, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card hover className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary font-mono text-xs text-muted-foreground">
              {formatRank(match.rank ?? index + 1)}
            </span>
            <div>
              <h3 className="text-base font-semibold">{match.title}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-3.5" /> {match.company}
                </span>
                {match.location ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {match.location}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
          <ScoreBadge score={match.score} />
        </div>

        <SimilarityBar score={match.score} />

        <p className="text-sm leading-relaxed text-muted-foreground">
          {truncate(match.description || "", 200)}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Matched skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(match.matched_skills || []).map((skill) => (
                <Badge key={skill} tone="success">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <MissingSkills skills={match.missing_skills} />
        </div>
      </Card>
    </motion.div>
  );
}
