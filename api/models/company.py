# app/models/company.py
from pydantic import BaseModel, Field

# from typing import Optional
from bson import ObjectId
from api.models.base import PyObjectId


class CompanyBase(BaseModel):
    _id: str
    name: str
    views: int


class CompanyCreate(CompanyBase):
    pass


class Company(CompanyBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
