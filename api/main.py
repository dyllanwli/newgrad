# app/main.py
import os
from contextlib import asynccontextmanager
import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import IS_PROD, load_dotenv, check_status
from api.dependencies import create_text_index
from api.routes import jobs, comments

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # setup_logging()  
    load_dotenv()
    check_status()
    await create_text_index()
    yield

app = FastAPI(
    title="API",
    openapi_url=None if IS_PROD else "/openapi.json",
    docs_url=None if IS_PROD else "/docs",
    lifespan=lifespan,
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


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
