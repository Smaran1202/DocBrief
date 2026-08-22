# DocuBrief AI

DocuBrief AI is a document summary assistant that accepts PDF and image documents, extracts text from them, and will generate concise AI-powered summaries in later phases.

## Planned Features

- Upload PDF and image documents
- Extract text from PDFs
- Use OCR for scanned documents and images
- Generate document summaries with Gemini

## Technology Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Python, FastAPI
- Planned document processing: PyMuPDF, Tesseract OCR
- Planned AI integration: Gemini API

## Current Status

Phase 2 is complete: the app supports frontend document selection, backend upload validation, PDF text extraction, and image OCR. AI summaries are not implemented yet.

## Local Setup

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app
```

The backend health check is available at `http://127.0.0.1:8000/api/health`.
API docs are available at `http://127.0.0.1:8000/docs`.

Image OCR requires Tesseract to be installed on your system:

- Windows: install Tesseract OCR and add it to `PATH`, or set `TESSERACT_CMD` to the executable path.
- macOS: `brew install tesseract`
- Ubuntu/Debian: `sudo apt install tesseract-ocr`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at the local URL printed by Vite, typically `http://localhost:5173`.
