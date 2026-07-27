"""
Extracts plain text from an uploaded resume file. This is intentionally the
extension point to your existing Resume Extractor project -- if you already
have regex-based structured field extraction there, call it here and pass
the *structured* text (skills + experience sections weighted higher) into
the embedder instead of raw text. That upgrade is a strong stretch goal
(see docs/ROADMAP.md, Phase 4).
"""

import os
from pypdf import PdfReader
import docx


def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        reader = PdfReader(file_path)
        return "\n".join(page.extract_text() or "" for page in reader.pages)

    if ext == ".docx":
        d = docx.Document(file_path)
        return "\n".join(p.text for p in d.paragraphs)

    if ext == ".txt":
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    raise ValueError(f"Unsupported file type: {ext}")
