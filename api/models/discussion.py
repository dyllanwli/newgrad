from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from api.models.base import PyObjectId


class DiscussionBase(BaseModel):
    title: str
    content: Optional[str] = None
    posted_by: str
    username: str
    likes: Optional[int] = 0
    comments: Optional[int] = 0
    views: Optional[int] = 0
    tags: Optional[List[str]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class DiscussionCreate(DiscussionBase):
    pass


class Discussion(DiscussionBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
