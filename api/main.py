# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.config import IS_PROD
from api.routes import jobs, comments
from api.dependencies import create_text_index

app = FastAPI(
    title="API",
    openapi_url=None if IS_PROD else "/openapi.json",
    docs_url=None if IS_PROD else "/docs",
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router, prefix="/api")
app.include_router(comments.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    await create_text_index()

