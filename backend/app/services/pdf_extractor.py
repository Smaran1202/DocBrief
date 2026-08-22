import logging

import fitz

logger = logging.getLogger(__name__)


class ExtractionError(Exception):
    pass


def extract_pdf_text(content: bytes) -> str:
    try:
        with fitz.open(stream=content, filetype="pdf") as document:
            pages = [page.get_text("text") for page in document]
    except Exception as exc:
        logger.exception("PDF extraction failed")
        raise ExtractionError("Could not extract text from the PDF.") from exc

    return "\n\n".join(pages)
