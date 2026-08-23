import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.documents import router as documents_router

load_dotenv()

app = FastAPI(title="DocuBrief AI API")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://doc-brief-lqgnxwlt-smaran-s-projects.vercel.app",
    "https://doc-brief.vercel.app",
]

frontend_origin = os.getenv("FRONTEND_ORIGIN")

if frontend_origin:
    allowed_origins.append(frontend_origin.rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents_router)


@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "DocuBrief AI API"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "ok"
    }