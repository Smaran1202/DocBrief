import logging
import os

from google import genai
from google.genai import types

from app.schemas.documents import SummaryLength

logger = logging.getLogger(__name__)

DEFAULT_GEMINI_MODEL = "gemini-2.5-flash"

LENGTH_INSTRUCTIONS = {
    "short": "Write a concise summary in approximately 3-5 sentences.",
    "medium": (
        "Write approximately 1-3 paragraphs that include the important details "
        "and main ideas."
    ),
    "long": (
        "Write a detailed summary that covers the major points without "
        "unnecessarily repeating the document."
    ),
}


class GeminiConfigurationError(Exception):
    pass


class GeminiSummaryError(Exception):
    pass


def build_summary_prompt(text: str, length: SummaryLength) -> str:
    return f"""Summarize only the supplied document.
Preserve important facts and main ideas.
Do not invent information or rely on outside knowledge.
Produce clear, readable output.
Avoid unnecessary introductory text.

Length requirement:
{LENGTH_INSTRUCTIONS[length]}

Document:
\"\"\"
{text}
\"\"\""""


def summarize_document_text(text: str, length: SummaryLength) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise GeminiConfigurationError("Gemini API key is not configured.")

    model = os.getenv("GEMINI_MODEL", DEFAULT_GEMINI_MODEL)
    prompt = build_summary_prompt(text, length)

    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
            ),
        )
    except Exception as exc:
        logger.exception("Gemini summary generation failed")
        raise GeminiSummaryError("Gemini summary generation failed.") from exc

    summary = (response.text or "").strip()
    if not summary:
        raise GeminiSummaryError("Gemini returned an empty summary.")

    return summary
