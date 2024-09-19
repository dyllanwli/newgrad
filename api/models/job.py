# app/models/job.py
from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId
from api.models.base import PyObjectId
from api.models.company import Company
from datetime import datetime

class Location(BaseModel):
    state: str
    city: str
    country: Optional[str] = None


class JobBase(BaseModel):
    _id: str
    position: str
    company_id: str
    company_name: str
    locations: List[Location]
    not_sponsor: Optional[bool] = None
    us_citizen: Optional[bool] = None
    description: Optional[str] = None
    internship: Optional[bool] = None
    remote: Optional[bool] = None
    expired: bool
    apply_link: str
    min_salary: Optional[float] = None
    max_salary: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    company: Optional[Company] = None
    tags: Optional[List[str]] = None


class JobCreate(JobBase):
    pass


class Job(JobBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
