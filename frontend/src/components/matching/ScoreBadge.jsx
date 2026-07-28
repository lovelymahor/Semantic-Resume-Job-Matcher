import Badge from "../common/Badge";
import { scoreTone } from "../../utils/helpers";
import { formatScore } from "../../utils/formatters";

export default function ScoreBadge({ score = 0 }) {
  return <Badge tone={scoreTone(score)}>cosine {formatScore(score)}</Badge>;
}
