# app/models/company.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId
from api.models.base import PyObjectId


class CompanyBase(BaseModel):
    title: str
    posted_by: str = "admin"
    username: str = "admin"
    likes: Optional[int] = 0
    comments: Optional[int] = 0
    views: int
    description: Optional[str] = None
    employees: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class CompanyCreate(CompanyBase):
    pass


class Company(CompanyBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
