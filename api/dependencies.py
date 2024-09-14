# app/dependencies.py
from motor.motor_asyncio import AsyncIOMotorClient
from api.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
db = client["newgrad"]
