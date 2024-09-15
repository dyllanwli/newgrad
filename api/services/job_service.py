# app/services/job_service.py
from typing import Optional
from bson import ObjectId
from pymongo import ASCENDING
from api.models.job import Job, JobCreate
from api.dependencies import newgrad_db

async def create_job(job: JobCreate):
    job_dict = job.dict()
    result = await newgrad_db.jobs.insert_one(job_dict)
    job_dict["_id"] = result.inserted_id
    return Job(**job_dict)

async def get_jobs(skip: int = 0, limit: int = 10, search: Optional[str] = None):
    query = {}
    if search:
        query = {"$text": {"$search": search}}

    jobs_cursor = newgrad_db.jobs.find(query).sort("_id", ASCENDING).skip(skip).limit(limit)
    jobs = await jobs_cursor.to_list(length=limit)
    total_jobs = await newgrad_db.jobs.count_documents(query)
    return jobs, total_jobs

async def get_job(job_id: str):
    job = await newgrad_db.jobs.find_one({"_id": ObjectId(job_id)})
    if job:
        return Job(**job)
    return None
