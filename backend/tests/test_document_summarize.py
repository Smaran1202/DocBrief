from fastapi.testclient import TestClient
import pytest

from app.main import app
from app.services.gemini_summary import GeminiConfigurationError, GeminiSummaryError

client = TestClient(app)


@pytest.mark.parametrize("length", ["short", "medium", "long"])
def test_summarize_document_returns_summary_for_allowed_lengths(monkeypatch, length):
    def fake_summarize_document_text(text, length):
        assert text == "Important extracted text."
        return f"{length.title()} summary."

    monkeypatch.setattr(
        "app.routes.documents.summarize_document_text",
        fake_summarize_document_text,
    )

    response = client.post(
        "/api/documents/summarize",
        json={"text": "Important extracted text.", "length": length},
    )

    assert response.status_code == 200
    assert response.json() == {
        "summary": f"{length.title()} summary.",
        "length": length,
    }


def test_summarize_document_rejects_empty_text():
    response = client.post(
        "/api/documents/summarize",
        json={"text": "   ", "length": "medium"},
    )

    assert response.status_code == 422


def test_summarize_document_rejects_invalid_length():
    response = client.post(
        "/api/documents/summarize",
        json={"text": "Extracted text.", "length": "tiny"},
    )

    assert response.status_code == 422


def test_summarize_document_rejects_oversized_text():
    response = client.post(
        "/api/documents/summarize",
        json={"text": "x" * 120_001, "length": "long"},
    )

    assert response.status_code == 422


def test_summarize_document_handles_missing_api_key(monkeypatch):
    def fake_summarize_document_text(text, length):
        raise GeminiConfigurationError("missing key")

    monkeypatch.setattr(
        "app.routes.documents.summarize_document_text",
        fake_summarize_document_text,
    )

    response = client.post(
        "/api/documents/summarize",
        json={"text": "Extracted text.", "length": "short"},
    )

    assert response.status_code == 503
    assert response.json()["detail"] == "AI summarization is not configured on this server."


def test_summarize_document_handles_gemini_failure(monkeypatch):
    def fake_summarize_document_text(text, length):
        raise GeminiSummaryError("api failed")

    monkeypatch.setattr(
        "app.routes.documents.summarize_document_text",
        fake_summarize_document_text,
    )

    response = client.post(
        "/api/documents/summarize",
        json={"text": "Extracted text.", "length": "long"},
    )

    assert response.status_code == 502
    assert (
        response.json()["detail"]
        == "We couldn't generate a summary right now. Please try again."
    )
