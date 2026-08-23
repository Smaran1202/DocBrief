import fitz
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_extract_document_returns_pdf_text():
    document = fitz.open()
    page = document.new_page()
    page.insert_text((72, 72), "Backend extraction regression text")
    content = document.tobytes()
    document.close()

    response = client.post(
        "/api/documents/extract",
        files={"document": ("sample.pdf", content, "application/pdf")},
    )

    assert response.status_code == 200
    assert "Backend extraction regression text" in response.json()["text"]


def test_extract_document_rejects_invalid_file_type():
    response = client.post(
        "/api/documents/extract",
        files={"document": ("sample.txt", b"plain text", "text/plain")},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported file type. Please upload a PDF or image."


def test_extract_document_rejects_blank_pdf():
    document = fitz.open()
    document.new_page()
    content = document.tobytes()
    document.close()

    response = client.post(
        "/api/documents/extract",
        files={"document": ("blank.pdf", content, "application/pdf")},
    )

    assert response.status_code == 422
    assert response.json()["detail"] == (
        "No readable text could be extracted from this document."
    )
