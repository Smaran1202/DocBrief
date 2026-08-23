DocuBrief AI
> An AI-powered document intelligence workspace that extracts content from PDFs and images and generates concise, configurable summaries.
DocuBrief AI is a full-stack application designed to simplify document understanding. Users can upload documents, extract their text using document-processing and OCR techniques, and generate AI-powered summaries using Google Gemini.
The project combines a React frontend with a FastAPI backend and follows a modular API-driven architecture.
---
🚀 Features
📄 Upload PDF and image documents
🔍 Extract text from PDF documents using PyMuPDF
🖼️ OCR support for image-based documents using Tesseract
🤖 AI-powered document summarization using Google Gemini
📏 Configurable summary length
⚡ FastAPI REST backend
⚛️ React + Vite frontend
🎨 Tailwind CSS
🔐 Environment-based configuration for API credentials
✅ File type and size validation
🩺 Backend health-check endpoint
📚 Automatically generated API documentation with Swagger UI
🔌 Clean separation between frontend, backend, and document-processing services
---
🏗️ Architecture
```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Vite + Tailwind    │
                         └──────────┬───────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI Backend   │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ PDF          │  │ Tesseract    │  │ Validation   │
          │ Extraction   │  │ OCR          │  │ & Processing │
          │ PyMuPDF      │  │              │  │              │
          └──────┬───────┘  └──────┬───────┘  └──────────────┘
                 │                 │
                 └────────┬────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  Extracted Text  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │   Google Gemini  │
                 │  Summarization   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Generated Summary│
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  React Frontend  │
                 └──────────────────┘
```
---
🔄 How It Works
1. Upload
The user uploads a supported PDF or image through the React frontend.
Supported formats:
PDF
PNG
JPG
JPEG
2. Extract
The FastAPI backend processes the uploaded document.
PDF: text is extracted using PyMuPDF.
Images: text is extracted using Tesseract OCR.
3. Summarize
The extracted text is sent to Google Gemini, which generates a summary based on the selected summary length.
```text
Document
    ↓
File Validation
    ↓
PDF Extraction / OCR
    ↓
Extracted Text
    ↓
Google Gemini
    ↓
AI Summary
    ↓
React Frontend
```
---
🛠️ Technology Stack
Frontend
React.js
Vite
Tailwind CSS
JavaScript
Backend
Python
FastAPI
Uvicorn
Pydantic
Document Processing
PyMuPDF
Tesseract OCR
AI
Google Gemini API
Development & API Tools
Git
GitHub
VS Code
Swagger UI
OpenAPI
---
📁 Project Structure
```text
DocuBrief AI/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.*
│
├── .gitignore
└── README.md
```
---
🔌 REST API
Health Check
```http
GET /api/health
```
Used to verify that the backend service is running.
Extract Document Text
```http
POST /api/documents/extract
```
Extracts text from an uploaded PDF or image document.
Generate Summary
```http
POST /api/documents/summarize
```
Generates an AI-powered summary from the document content.
---
📚 API Documentation
When running locally, FastAPI provides interactive API documentation.
Swagger UI
```text
http://localhost:8000/docs
```
ReDoc
```text
http://localhost:8000/redoc
```
---
⚙️ Local Development
Prerequisites
Install:
Python 3.11+
Node.js
npm
Tesseract OCR
Git
You also need a Google Gemini API key.
---
🔧 Backend Setup
Navigate to the backend:
```bash
cd backend
```
Create a virtual environment:
```bash
python -m venv .venv
```
On Windows:
```powershell
.\.venv\Scripts\activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```
---
🔐 Environment Variables
Create:
```text
backend/.env
```
Add the required configuration:
```env
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_ORIGIN=http://localhost:5173
```
Do not commit `.env` to GitHub.
Use `.env.example` to document required environment variables without storing real credentials.
---
▶️ Run Backend
From the `backend` directory:
```bash
uvicorn app.main:app --reload --port 8000
```
The backend will be available at:
```text
http://localhost:8000
```
Swagger UI:
```text
http://localhost:8000/docs
```
---
🎨 Frontend Setup
Open another terminal and navigate to the frontend:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
The frontend will normally be available at:
```text
http://localhost:5173
```
---
🧪 Testing
Before deployment, verify:
[x] Backend health check
[x] PDF upload
[x] Image upload
[x] PDF text extraction
[x] OCR extraction
[x] Gemini summarization
[x] Summary length selection
[x] Invalid file handling
[x] File size validation
[x] Frontend/backend communication
[x] Swagger API testing
Backend tests can be executed using:
```bash
pytest
```
---
🔒 Security
The application follows basic security practices for API credentials and uploaded files.
API credentials are stored using environment variables.
Gemini API keys are not hard-coded.
`.env` is excluded from Git.
Uploaded files are validated by type and size.
Backend APIs validate incoming requests.
Production secrets should be configured through the deployment platform.
The Gemini API key must never be exposed to frontend/browser code.
---
🚀 Production Deployment
DocuBrief AI is designed to deploy the frontend and backend as separate services.
```text
                    Production
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
      React Frontend         FastAPI Backend
                                   │
                                   ▼
                             Google Gemini
```
The production frontend must communicate with the deployed backend URL rather than:
```text
http://localhost:8000
```
Production environment variables should be configured directly through the hosting platform.
Tesseract OCR must also be available in the backend deployment environment.
---
📌 Project Status
Completed
[x] Project foundation
[x] React frontend
[x] FastAPI backend
[x] Document upload
[x] File validation
[x] PDF text extraction
[x] Image OCR
[x] Gemini AI integration
[x] AI summarization
[x] Configurable summary length
[x] REST API
[x] Swagger/OpenAPI documentation
[x] Environment-based configuration
[x] Frontend/backend integration
[x] Local end-to-end testing
Deployment
[ ] Deploy backend
[ ] Deploy frontend
[ ] Configure production environment variables
[ ] Connect frontend to production backend
[ ] Perform final production testing
---
🎯 Engineering Highlights
DocuBrief AI demonstrates practical software engineering concepts including:
Full-stack application development
REST API design
Client-server architecture
Modular FastAPI backend architecture
React component-based frontend
File upload and validation
PDF document processing
OCR integration
Generative AI integration
Environment-based configuration
API error handling
Frontend/backend integration
OpenAPI documentation
Git-based version control
Production deployment preparation
---
🔮 Future Improvements
Potential future improvements include:
User authentication
Document history
Multiple document summarization
Streaming AI responses
Export summaries to PDF/DOCX
Semantic document search
Embedding-based retrieval
RAG-based document question answering
Cloud object storage
Background processing for large documents
Usage monitoring and analytics
---
💡 Why DocuBrief AI?
Reading and understanding long documents can be time-consuming.
DocuBrief AI combines traditional document-processing techniques with generative AI to provide a simple workflow:
```text
Upload
   ↓
Extract
   ↓
Understand
   ↓
Summarize
```
The application demonstrates how document processing, OCR, REST APIs, and generative AI can be combined into a practical full-stack system.
---
👨‍💻 Author
Smaran Pidathala
B.Tech Computer Science Engineering
GitHub:  
https://github.com/Smaran1202
LinkedIn:  
https://www.linkedin.com/in/smaran-pidathala/
---
⭐ DocuBrief AI
React + FastAPI + PyMuPDF + Tesseract OCR + Google Gemini