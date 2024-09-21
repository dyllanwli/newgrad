from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId
from api.models.base import PyObjectId
from api.models.job import Job
from datetime import datetime
from enum import Enum


class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class UserJobApplication(BaseModel):
    job_id: str
    job: Optional[Job] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    applied_at: datetime = Field(default_factory=datetime.utcnow)
    status: ApplicationStatus


class UserBase(BaseModel):
    _id: str
    username: str
    applied_jobs: Optional[List[str]] = None


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
