# api/models/comment.py

from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from api.models.base import PyObjectId
from typing import Optional


class CommentBase(BaseModel):
    content: str
    datePosted: datetime = Field(default_factory=datetime.utcnow)
    userId: Optional[str] = None


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
