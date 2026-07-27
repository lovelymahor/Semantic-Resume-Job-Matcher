from dataclasses import dataclass, field
from typing import List


@dataclass
class JobMatch:
    job_id: str
    title: str
    company: str
    similarity_score: float


@dataclass
class MatchResponse:
    matches: List[JobMatch] = field(default_factory=list)
    resume_char_count: int = 0
    model_used: str = ""
