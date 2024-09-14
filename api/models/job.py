# app/models/job.py
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from api.models.base import PyObjectId


class JobBase(BaseModel):
    title: str
    description: str
    company: str
    location: str
    upvote: int
    downvote: int
    min_salary: Optional[float]
    max_salary: Optional[float]


class JobCreate(JobBase):
    pass


class Job(JobBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "title": "Software Engineer",
                "description": "Job description here...",
                "company": "Tech Corp",
                "location": "New York, NY",
                "upvote": "100",
                "downvote": "10",
                "min_salary": 110000.00,
                "max_salary": 120000.00,
            }
        }
