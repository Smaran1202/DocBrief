from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.documents import DocumentExtractionResponse
from app.services.ocr_service import OcrError, extract_image_text
from app.services.pdf_extractor import ExtractionError, extract_pdf_text
from app.utils.file_validation import (
    MAX_FILE_SIZE_BYTES,
    FileValidationError,
    validate_document_file,
)
from app.utils.text_cleaner import clean_extracted_text

router = APIRouter(prefix="/api/documents", tags=["documents"])


@router.post(
    "/extract",
    response_model=DocumentExtractionResponse,
    summary="Extract text from an uploaded document",
    description="Accepts one PDF, PNG, JPG, or JPEG file and returns extracted text.",
)
async def extract_document_text(
    document: UploadFile = File(
        ...,
        description="A PDF or image document, up to 10 MB.",
    ),
):
    content = await document.read(MAX_FILE_SIZE_BYTES + 1)

    try:
        validated_file = validate_document_file(
            filename=document.filename or "",
            content_type=document.content_type or "",
            content=content,
        )
    except FileValidationError as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.message) from exc

    try:
        if validated_file.extension == ".pdf":
            extracted_text = extract_pdf_text(validated_file.content)
        else:
            extracted_text = extract_image_text(validated_file.content)
    except (ExtractionError, OcrError) as exc:
        raise HTTPException(
            status_code=422,
            detail="We couldn't extract text from this document. Please try another file.",
        ) from exc

    cleaned_text = clean_extracted_text(extracted_text)
    if not cleaned_text:
        raise HTTPException(
            status_code=422,
            detail="No readable text could be extracted from this document.",
        )

    return DocumentExtractionResponse(
        filename=validated_file.filename,
        file_type=validated_file.content_type,
        text=cleaned_text,
    )
