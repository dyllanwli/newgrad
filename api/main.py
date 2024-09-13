from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.config import IS_PROD

app = FastAPI(
    title="API",
    openapi_url=None if IS_PROD else "/openapi.json",
    docs=False if IS_PROD else True,
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


@app.get("/")
def read_root():
    return {"Hello": "World"}
