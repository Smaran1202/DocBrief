# DocuBrief AI

DocuBrief AI is a document summary assistant that accepts PDF and image documents, extracts text from them, and generates AI-powered summaries with Gemini.

## Planned Features

- Upload PDF and image documents
- Extract text from PDFs
- Use OCR for scanned documents and images
- Generate document summaries with Gemini

## Technology Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Python, FastAPI
- Planned document processing: PyMuPDF, Tesseract OCR
- AI integration: Gemini API

## Current Status

Phase 3 is complete: the app supports frontend document selection, backend upload validation, PDF text extraction, image OCR, and Gemini-powered AI summaries.

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

Create a backend `.env` file from `.env.example` and set:

```bash
GEMINI_API_KEY=your_api_key_here
```

The key is read only by the backend and is never exposed to the frontend.

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

## API Endpoints

- `GET /api/health`
- `POST /api/documents/extract`
- `POST /api/documents/summarize`

The summarize endpoint accepts extracted document text and a summary length:

```json
{
  "text": "Extracted document text...",
  "length": "short"
}
```

Allowed summary lengths:

- `short`: concise summary, approximately 3-5 sentences
- `medium`: approximately 1-3 paragraphs with important details and main ideas
- `long`: detailed summary covering major points without unnecessary repetition
