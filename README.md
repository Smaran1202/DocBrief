DocuBrief AI

An AI-powered document intelligence application that extracts text from PDFs and images and generates concise, configurable summaries.

DocuBrief AI is a full-stack application built to simplify document understanding. Users can upload supported PDF or image documents, extract their content using PDF text extraction or OCR, and generate AI-powered summaries using Google Gemini.

The application follows a client-server architecture with a React frontend and a FastAPI backend.

✨ Features

📄 Upload PDF and image documents

🔍 Extract text from PDFs using PyMuPDF

🖼️ Extract text from image-based documents using Tesseract OCR

🤖 Generate AI-powered summaries using Google Gemini

📏 Configure the desired summary length

⚡ REST APIs built with FastAPI

⚛️ React + Vite frontend

🎨 Tailwind CSS-based UI

✅ File type and file size validation

🔐 Environment-based API key configuration

🩺 Backend health-check endpoint

📚 Automatic OpenAPI/Swagger API documentation

🧩 Modular separation between routes, services, schemas, and utilities

🏗️ Architecture

                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React Frontend  │
                         │   Vite + Tailwind │
                         └─────────┬─────────┘
                                   │
                              REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  FastAPI Backend  │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
             ┌────────────┐ ┌────────────┐ ┌────────────┐
             │  PyMuPDF   │ │ Tesseract  │ │ Validation │
             │ PDF Parser │ │    OCR     │ │ & Handling │
             └─────┬──────┘ └─────┬──────┘ └────────────┘
                   │              │
                   └───────┬──────┘
                           ▼
                  ┌─────────────────┐
                  │  Extracted Text │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Google Gemini  │
                  │  Summarization  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Generated       │
                  │ Summary         │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  └─────────────────┘

🔄 How It Works

Upload
The user uploads a supported PDF or image through the React frontend.

Validate
The backend validates the uploaded file type and size before processing.

Extract

PDF documents are processed using PyMuPDF.

Image documents are processed using Tesseract OCR.

Summarize
The extracted text is sent to Google Gemini, along with the selected summary-length configuration.

Display
The generated summary is returned through the REST API and displayed in the React frontend.

Document
   │
   ▼
File Validation
   │
   ▼
PDF Extraction / OCR
   │
   ▼
Extracted Text
   │
   ▼
Google Gemini
   │
   ▼
AI Summary
   │
   ▼
React Frontend

🛠️ Technology Stack

Frontend

React.js

Vite

JavaScript

Tailwind CSS

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

Development Tools

Git

GitHub

VS Code

Swagger UI / OpenAPI

Pytest

📁 Project Structure

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

🔌 REST API

Health Check

GET /api/health

Used to verify that the backend service is running.

Extract Document Text

POST /api/documents/extract

Accepts a supported PDF or image file and extracts its text.

Generate Summary

POST /api/documents/summarize

Generates an AI-powered summary from the extracted document content.

📚 API Documentation

When the FastAPI backend is running locally, interactive API documentation is available through Swagger UI:

http://localhost:8000/docs

ReDoc is also available:

http://localhost:8000/redoc

⚙️ Local Development

Prerequisites

Install the following:

Python 3.11+

Node.js and npm

Tesseract OCR

Git

Google Gemini API key

1. Clone the Repository

git clone https://github.com/Smaran1202/DocBrief.git
cd DocBrief

2. Backend Setup

Navigate to the backend:

cd backend

Create a virtual environment:

python -m venv .venv

Windows

.\.venv\Scripts\activate

macOS / Linux

source .venv/bin/activate

Install Python dependencies:

pip install -r requirements.txt

3. Configure Environment Variables

Create:

backend/.env

Add:

GEMINI_API_KEY=your_gemini_api_key
FRONTEND_ORIGIN=http://localhost:5173

Never commit .env or real API credentials to GitHub.
Use .env.example to document required environment variables.

4. Run the Backend

From the backend directory:

uvicorn app.main:app --reload --port 8000

Backend:

http://localhost:8000

Swagger UI:

http://localhost:8000/docs

5. Run the Frontend

Open another terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173

🔐 Security Considerations

The project follows basic security practices for application credentials and uploaded files:

Gemini API credentials are stored using environment variables.

API keys are not hard-coded into the frontend.

.env is excluded from Git.

Uploaded files are validated by type and size.

Backend APIs validate incoming requests.

Production secrets should be configured through the hosting platform.

Never expose the Gemini API key in browser-side code.

🧪 Testing

Backend tests can be executed using:

pytest

Before using the application, verify the main workflow:

[ ] Backend health check
[ ] PDF upload
[ ] Image upload
[ ] PDF text extraction
[ ] OCR extraction
[ ] Gemini summarization
[ ] Summary length selection
[ ] Invalid file handling
[ ] File size validation
[ ] Frontend/backend communication

🚀 Deployment

DocuBrief AI is structured so that the frontend and backend can be deployed as separate services.

                    Production
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       React Frontend         FastAPI Backend
                                    │
                                    ▼
                              Google Gemini

For production deployment:

Configure environment variables through the hosting platform.

Replace local backend URLs with the deployed backend URL.

Ensure Tesseract OCR is available in the backend environment.

Configure the appropriate frontend origin/CORS settings.

Perform end-to-end testing after deployment.

🎯 Engineering Highlights

DocuBrief AI demonstrates practical software engineering concepts including:

Full-stack application development

REST API design

Client-server architecture

Modular FastAPI backend structure

Component-based React frontend

File upload and validation

PDF document processing

OCR integration

Generative AI integration

Environment-based configuration

API error handling

OpenAPI documentation

Automated backend testing

Git-based version control

🔮 Future Improvements

Potential improvements include:

User authentication and authorization

Document history

Multiple-document summarization

Streaming AI responses

Export summaries to PDF/DOCX

Semantic document search

Embedding-based retrieval

RAG-based document question answering

Cloud object storage

Background processing for large documents

Usage monitoring and analytics

💡 Why DocuBrief AI?

Understanding long documents manually can be time-consuming. DocuBrief AI combines traditional document-processing techniques with generative AI to create a simple workflow:

Upload
   ↓
Extract
   ↓
Understand
   ↓
Summarize

The project demonstrates how document processing, OCR, REST APIs, and generative AI can be combined into a practical full-stack application.

👨‍💻 Author

Smaran Pidathala
B.Tech — Computer Science Engineering

GitHub: https://github.com/Smaran1202

LinkedIn: https://www.linkedin.com/in/smaran-pidathala/

📌 Project

DocuBrief AI
React + FastAPI + PyMuPDF + Tesseract OCR + Google Gemini
