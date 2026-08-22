from dataclasses import dataclass
from pathlib import Path

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

ALLOWED_FILE_TYPES = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
}


@dataclass(frozen=True)
class ValidatedDocument:
    filename: str
    content_type: str
    extension: str
    content: bytes


class FileValidationError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def validate_document_file(filename: str, content_type: str, content: bytes):
    extension = Path(filename or "").suffix.lower()

    if extension not in ALLOWED_FILE_TYPES:
        raise FileValidationError(
            "Unsupported file type. Please upload a PDF or image."
        )

    expected_content_type = ALLOWED_FILE_TYPES[extension]
    if content_type != expected_content_type:
        raise FileValidationError(
            "Unsupported file type. Please upload a PDF or image."
        )

    if len(content) > MAX_FILE_SIZE_BYTES:
        raise FileValidationError(
            "File is too large. Maximum size is 10 MB.",
            status_code=413,
        )

    return ValidatedDocument(
        filename=filename,
        content_type=content_type,
        extension=extension,
        content=content,
    )
