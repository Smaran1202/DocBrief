# DocuBrief AI

An AI-powered document intelligence workspace that extracts content from
PDFs and images and generates concise, configurable summaries.

DocuBrief AI is a full-stack application designed to simplify document
understanding. Users can upload documents, extract text using
document-processing and OCR techniques, and generate AI-powered
summaries using Google Gemini.

The application combines a React frontend with a FastAPI backend and
follows a modular, API-driven architecture.

------------------------------------------------------------------------

## 🚀 Features

-   📄 Upload PDF and image documents
-   🔎 Extract text from PDF documents using PyMuPDF
-   🖼️ OCR support for image-based documents using Tesseract
-   🤖 AI-powered document summarization using Google Gemini
-   📏 Configurable summary length
-   ⚡ FastAPI REST backend
-   ⚛️ React + Vite frontend
-   🎨 Tailwind CSS styling
-   🔐 Environment-based configuration for API credentials
-   ✅ File type and size validation
-   🩺 Backend health-check endpoint
-   📚 Automatically generated API documentation with Swagger UI
-   🧩 Clean separation between frontend, backend, and
    document-processing services

------------------------------------------------------------------------

## 🏗️ Architecture

The application follows a client-server architecture with separate
frontend, backend, document-processing, and AI components.

### Main Flow

1.  **User**
    -   Uploads a supported PDF or image document.
2.  **React Frontend**
    -   Provides the user interface.
    -   Sends document requests to the backend through REST APIs.
3.  **FastAPI Backend**
    -   Receives and validates uploaded files.
    -   Coordinates document extraction and summarization.
4.  **Document Processing**
    -   PDF files are processed using PyMuPDF.
    -   Image files are processed using Tesseract OCR.
5.  **Extracted Text**
    -   The extracted content is prepared for summarization.
6.  **Google Gemini**
    -   Receives the extracted document content.
    -   Generates a summary based on the selected summary length.
7.  **Generated Summary**
    -   The summary is returned through the backend API.
8.  **React Frontend**
    -   Displays the generated summary to the user.

------------------------------------------------------------------------

## 🔄 How It Works

### 1. Document Upload

The user uploads a supported PDF or image through the React frontend.

Supported formats include:

-   PDF
-   PNG
-   JPG
-   JPEG

### 2. File Validation

The backend validates the uploaded file before processing.

Validation includes:

-   File type validation
-   File size validation
-   Invalid file handling

### 3. Text Extraction

The application uses different extraction methods depending on the
document type.

-   **PDF:** PyMuPDF extracts text directly from the document.
-   **Images:** Tesseract OCR extracts text from image-based documents.

### 4. AI Summarization

The extracted text is sent to Google Gemini.

The user can select the desired summary length, and Gemini generates the
corresponding summary.

### 5. Result Display

The generated summary is returned to the React frontend and displayed to
the user.

### Overall Workflow

**Upload → Validate → Extract → Summarize → Display**

------------------------------------------------------------------------

## 🛠️ Technology Stack

### Frontend

-   React.js
-   Vite
-   JavaScript
-   Tailwind CSS

### Backend

-   Python
-   FastAPI
-   Uvicorn

### Document Processing

-   PyMuPDF
-   Tesseract OCR

### AI

-   Google Gemini API

### Development & API Tools

-   Git
-   GitHub
-   VS Code
-   Swagger UI
-   OpenAPI

------------------------------------------------------------------------

## 📁 Project Structure

-   **DocuBrief AI/**
    -   **backend/**
        -   **app/**
            -   `routes/` --- API route definitions
            -   `schemas/` --- Request and response schemas
            -   `services/` --- Document processing and AI services
            -   `utils/` --- Utility functions
            -   `main.py` --- FastAPI application entry point
        -   `tests/` --- Backend tests
        -   `requirements.txt` --- Python dependencies
        -   `.env.example` --- Environment variable template
        -   `.gitignore` --- Backend Git exclusions
    -   **frontend/**
        -   `src/` --- React source code
        -   `public/` --- Static assets
        -   `package.json` --- Frontend dependencies and scripts
        -   `vite.config.*` --- Vite configuration
    -   `.gitignore` --- Project-level Git exclusions
    -   `README.md` --- Project documentation

------------------------------------------------------------------------

## 🔌 REST API

The backend exposes REST endpoints for health checks, document
extraction, and summarization.

### Backend Health Check

**GET**

`/api/health`

Used to verify that the backend service is running.

### Extract Document Text

**POST**

`/api/documents/extract`

Extracts text from an uploaded PDF or image document.

### Generate Summary

**POST**

`/api/documents/summarize`

Generates an AI-powered summary from the extracted document content.

------------------------------------------------------------------------

## 📚 API Documentation

When running the backend locally, FastAPI provides interactive API
documentation.

### Swagger UI

`http://localhost:8000/docs`

### ReDoc

`http://localhost:8000/redoc`

------------------------------------------------------------------------

## ⚙️ Local Development

### Prerequisites

Install the following:

-   Python 3.11+
-   Node.js
-   npm
-   Tesseract OCR
-   Git
-   Google Gemini API key

------------------------------------------------------------------------

## 🔧 Backend Setup

Navigate to the backend directory:

``` bash
cd backend
```

Create a Python virtual environment:

``` bash
python -m venv .venv
```

Activate the virtual environment on Windows:

``` powershell
.\.venv\Scripts\activate
```

Install backend dependencies:

``` bash
pip install -r requirements.txt
```

------------------------------------------------------------------------

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Add the required configuration:

``` env
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_ORIGIN=http://localhost:5173
```

Do not commit `.env` to GitHub.

Use `.env.example` to document the required environment variables
without storing real credentials.

------------------------------------------------------------------------

## ▶️ Run the Backend

From the `backend` directory:

``` bash
uvicorn app.main:app --reload --port 8000
```

The backend will be available at:

`http://localhost:8000`

Swagger UI:

`http://localhost:8000/docs`

------------------------------------------------------------------------

## 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

``` bash
cd frontend
```

Install frontend dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

The frontend will normally be available at:

`http://localhost:5173`

------------------------------------------------------------------------

## 🧪 Testing

Before using the application, verify the main workflow:

-   [ ] Backend health check
-   [ ] PDF upload
-   [ ] Image upload
-   [ ] PDF text extraction
-   [ ] OCR extraction
-   [ ] Gemini summarization
-   [ ] Summary length selection
-   [ ] Invalid file handling
-   [ ] File size validation
-   [ ] Frontend/backend communication
-   [ ] Swagger API testing

Backend tests can be executed using:

``` bash
pytest
```

------------------------------------------------------------------------

## 🔒 Security

The application follows basic security practices for API credentials and
uploaded files.

-   Gemini API credentials are stored using environment variables.
-   `.env` is excluded from Git.
-   Uploaded files are validated by type and size.
-   Backend APIs validate incoming requests.
-   Production secrets should be configured through the deployment
    platform.
-   The Gemini API key must never be exposed to frontend or browser
    code.

------------------------------------------------------------------------

## 🚀 Production Deployment

DocuBrief AI is designed to deploy the frontend and backend as separate
services.

### Production Architecture

1.  **React Frontend**
    -   Deployed as a frontend service.
2.  **FastAPI Backend**
    -   Deployed as a backend service.
3.  **Google Gemini**
    -   Accessed securely by the backend using the configured API key.

### Production Configuration

The production frontend must communicate with the deployed backend URL
rather than:

`http://localhost:8000`

Production environment variables should be configured directly through
the hosting platform.

Tesseract OCR must also be available in the backend deployment
environment.

------------------------------------------------------------------------

## 📌 Project Status

### Completed

-   [x] Project foundation
-   [x] React frontend
-   [x] FastAPI backend
-   [x] Document upload
-   [x] File validation
-   [x] PDF text extraction
-   [x] Image OCR
-   [x] Gemini AI integration
-   [x] AI summarization
-   [x] Configurable summary length
-   [x] REST API
-   [x] Swagger/OpenAPI documentation
-   [x] Environment-based configuration
-   [x] Frontend/backend integration
-   [x] Local end-to-end testing

### Deployment

-   [ ] Deploy backend
-   [ ] Deploy frontend
-   [ ] Configure production environment variables
-   [ ] Connect frontend to production backend
-   [ ] Perform final production testing

------------------------------------------------------------------------

## 🎯 Engineering Highlights

DocuBrief AI demonstrates practical software engineering concepts
including:

-   Full-stack application development
-   REST API design
-   Client-server architecture
-   Modular FastAPI backend architecture
-   React component-based frontend
-   File upload and validation
-   PDF document processing
-   OCR integration
-   Generative AI integration
-   Environment-based configuration
-   API error handling
-   Frontend/backend integration
-   OpenAPI documentation
-   Git-based version control
-   Production deployment preparation

------------------------------------------------------------------------

## 🔮 Future Improvements

Potential future improvements include:

-   User authentication
-   Document history
-   Multiple document summarization
-   Streaming AI responses
-   Export summaries to PDF or DOCX
-   Semantic document search
-   Embedding-based retrieval
-   RAG-based document question answering
-   Cloud object storage
-   Background processing for large documents
-   Usage monitoring and analytics

------------------------------------------------------------------------

## 💡 Why DocuBrief AI?

Reading and understanding long documents can be time-consuming.

DocuBrief AI combines traditional document-processing techniques with
generative AI to provide a simple workflow:

**Upload → Extract → Understand → Summarize**

The application demonstrates how document processing, OCR, REST APIs,
and generative AI can be combined into a practical full-stack system.


------------------------------------------------------------------------

## ⭐ Project Summary

**DocuBrief AI**

React.js + FastAPI + PyMuPDF + Tesseract OCR + Google Gemini

An AI-powered full-stack document intelligence application for
extracting, understanding, and summarizing PDF and image-based
documents.
