# app/dependencies.py
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from api.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
newgrad_db: AsyncIOMotorDatabase = client["newgrad"]


async def create_index():
    pass
