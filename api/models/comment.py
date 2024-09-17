# api/models/comment.py

from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from api.models.base import PyObjectId
from typing import Optional


class CommentBase(BaseModel):
    content: str
    userId: Optional[str] = None
    username: Optional[str] = None
    parent_id: Optional[PyObjectId] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)



class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    upvote_count: int = 0
    downvote_count: int = 0
    discuss_id: str

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}