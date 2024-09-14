# app/models/job.py
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    """Custom BSON ObjectId for Pydantic"""
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class JobBase(BaseModel):
    title: str
    description: str
    company: str
    location: str
    salary: Optional[float] = None

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
                "salary": 120000.00
            }
        }
