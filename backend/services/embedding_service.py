"""
Wraps the sentence-transformers model so the rest of the app never touches
the model directly. Keeping this in one place makes it trivial to swap
models later (e.g. a larger model, or an API-based embedding service)
without touching routes or index logic.
"""

from functools import lru_cache
from sentence_transformers import SentenceTransformer
from backend.config import EMBEDDING_MODEL_NAME


@lru_cache(maxsize=1)
def _get_model():
    # Cached so the model loads once per process, not once per request.
    return SentenceTransformer(EMBEDDING_MODEL_NAME)


def embed_texts(texts):
    """
    texts: list[str]
    returns: numpy array, shape (len(texts), EMBEDDING_DIM), L2-normalized
    """
    model = _get_model()
    embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True,  # so inner product == cosine similarity
        show_progress_bar=False,
    )
    return embeddings


def embed_text(text):
    """Convenience wrapper for a single string."""
    return embed_texts([text])[0]
