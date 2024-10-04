# app/main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import load_dotenv, lifespan, IS_PROD
from api.routes import jobs, comments, companies, community, users

load_dotenv()
app = FastAPI(
    lifespan=lifespan,
    docs_url=None if IS_PROD else "/docs",
    redoc_url=None if IS_PROD else "/redoc",
    openapi_url=None if IS_PROD else "/openapi.json"
)

origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://newgrad.works",
]

@app.middleware("http")
async def add_noindex_header(request, call_next):
    response = await call_next(request)
    response.headers['X-Robots-Tag'] = 'noindex, nofollow'
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router, prefix="/api")
app.include_router(comments.router, prefix="/api")
app.include_router(companies.router, prefix="/api")
app.include_router(community.router, prefix="/api")
app.include_router(users.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
