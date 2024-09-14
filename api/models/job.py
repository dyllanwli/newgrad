# app/models/job.py
from pydantic import BaseModel, Field
from typing import Optional, List
from bson import ObjectId
from api.models.base import PyObjectId


class Location(BaseModel):
    state: str
    city: str


class JobBase(BaseModel):
    position: str
    company: str
    locations: List[Location]
    not_sponsor: Optional[bool]
    us_citizen: Optional[bool]
    views: int
    date_posted: str
    description: str
    expired: bool
    apply_link: str
    min_salary: Optional[float]
    max_salary: Optional[float]


class JobCreate(JobBase):
    pass


class Job(JobBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
