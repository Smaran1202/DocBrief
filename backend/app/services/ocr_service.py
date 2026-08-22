import io
import logging
import os

import pytesseract
from PIL import Image, UnidentifiedImageError

logger = logging.getLogger(__name__)


class OcrError(Exception):
    pass


def extract_image_text(content: bytes) -> str:
    tesseract_cmd = os.getenv("TESSERACT_CMD")
    if tesseract_cmd:
        pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    try:
        with Image.open(io.BytesIO(content)) as image:
            return pytesseract.image_to_string(image)
    except UnidentifiedImageError as exc:
        logger.exception("Uploaded image could not be opened")
        raise OcrError("Could not read the uploaded image.") from exc
    except pytesseract.TesseractNotFoundError as exc:
        logger.exception("Tesseract executable was not found")
        raise OcrError("OCR is not configured on this server.") from exc
    except Exception as exc:
        logger.exception("Image OCR failed")
        raise OcrError("Could not extract text from the image.") from exc
