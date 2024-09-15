# api/models/vote.py

from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from api.models.base import PyObjectId

class Vote(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    comment_id: PyObjectId
    user_id: str
    vote_type: int  # 1 for upvote, -1 for downvote
    date_voted: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
