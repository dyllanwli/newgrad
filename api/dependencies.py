# app/dependencies.py
from motor.motor_asyncio import AsyncIOMotorClient
from api.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
newgrad_db = client["newgrad"]

async def create_text_index():
    await newgrad_db.jobs.create_index([
        ("position", "text"),
        ("company", "text")
    ])
