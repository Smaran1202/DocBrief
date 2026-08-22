from pydantic import BaseModel


class DocumentExtractionResponse(BaseModel):
    filename: str
    file_type: str
    text: str
