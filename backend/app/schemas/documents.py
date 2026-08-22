from typing import Literal

from pydantic import BaseModel, Field, field_validator

MAX_SUMMARY_INPUT_CHARS = 120_000
SummaryLength = Literal["short", "medium", "long"]


class DocumentExtractionResponse(BaseModel):
    filename: str
    file_type: str
    text: str


class DocumentSummaryRequest(BaseModel):
    text: str = Field(..., max_length=MAX_SUMMARY_INPUT_CHARS)
    length: SummaryLength

    @field_validator("text")
    @classmethod
    def text_must_not_be_empty(cls, value: str):
        if not value.strip():
            raise ValueError("Document text is required.")
        return value


class DocumentSummaryResponse(BaseModel):
    summary: str
    length: SummaryLength
