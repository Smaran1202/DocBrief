# DocuBrief AI

DocuBrief AI is a document summary assistant that will accept PDF and image documents and generate concise AI-powered summaries in later phases. This phase establishes the project foundation only.

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

Phase 0 is complete: the monorepo structure, FastAPI health endpoint, CORS configuration, environment example, and minimal React frontend are in place. Uploads, OCR, PDF extraction, and AI summaries are not implemented yet.

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at the local URL printed by Vite, typically `http://localhost:5173`.
