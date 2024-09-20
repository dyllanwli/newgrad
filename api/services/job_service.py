# api/services/job_service.py

from typing import Optional
from bson import ObjectId
from api.models.job import Job, JobCreate
from api.dependencies import newgrad_db as db


async def delete_job(job_id: str, where: str):
    if where == "queue":
        result = await db.jobs_queue.delete_one({"_id": ObjectId(job_id)})
        if result.deleted_count == 1:
            return {"detail": "Job queue deleted successfully"}
    elif where == "jobs":
        result = await db.jobs_queue.delete_one({"_id": ObjectId(job_id)})
        if result.deleted_count == 1:
            return {"detail": "Job deleted successfully"}


async def create_job_queue(job: JobCreate):
    job_dict = job.model_dump()
    company_id = job_dict.get("company_id")
    if not company_id:
        job_dict["company_id"] = ObjectId()
    else:
        job_dict["company_id"] = ObjectId(job_dict["company_id"])
    result = await db.jobs_queue.insert_one(job_dict)
    job_dict["company_id"] = str(job_dict["company_id"])
    job_dict["_id"] = result.inserted_id
    return Job(**job_dict)


async def update_job(job: JobCreate):
    job_dict = job.model_dump()
    company_id = job_dict.get("company_id")
    if not company_id:
        company_name = job_dict.get("company_name")
        existing_company = await db.companies.find_one({"name": company_name})

        if existing_company:
            company_id = existing_company["_id"]
        else:
            result = await db.companies.insert_one({"name": company_name})
            company_id = result.inserted_id

        job_dict["company_id"] = company_id
    else:
        job_dict["company_id"] = ObjectId(job_dict["company_id"])

    # Check if the job already exists
    existing_job = await db.jobs.find_one({"_id": job_dict["_id"]})
    if existing_job:
        # Update the existing job
        await db.jobs.update_one({"_id": job_dict["_id"]}, {"$set": job_dict})
        job_dict["company_id"] = str(job_dict["company_id"])
        return Job(**job_dict)
    else:
        # If the job does not exist, insert it as a new job
        result = await db.jobs.insert_one(job_dict)
        job_dict["company_id"] = str(job_dict["company_id"])
        job_dict["_id"] = result.inserted_id
        return Job(**job_dict)

async def get_jobs(skip: int = 0, limit: int = 10, search: Optional[str] = None, where: str = None):
    collection = None
    if where == "queue":
        collection = db.jobs_queue
    elif where == "jobs":
        collection = db.jobs
    else:
        return None, None
    pipeline = []
    if search:
        pipeline.append(
            {
                "$search": {
                    "index": "default",
                    "text": {
                        "query": search,
                        "path": ["position", "company_name"],
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 1,
                            "maxExpansions": 100,
                        },
                    },
                }
            }
        )
    pipeline.extend(
        [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company",
                }
            },
            {"$unwind": "$company"},
            {
                "$addFields": {
                    "_id": {"$toString": "$_id"},
                    "company_id": {"$toString": "$company_id"},
                }
            },
            {"$sort": {"_id": 1}},
            {"$skip": skip},
            {"$limit": limit},
        ]
    )

    cursor = collection.aggregate(pipeline)
    jobs = await cursor.to_list(length=limit)
    # Get total count of documents matching the search
    if search:
        count_pipeline = pipeline[:-3] + [{"$count": "total"}]
        count_cursor = collection.aggregate(count_pipeline)
        count_result = await count_cursor.to_list(length=1)
        total_jobs = count_result[0]["total"] if count_result else 0
    else:
        total_jobs = await collection.count_documents({})

    return jobs, total_jobs


async def get_job(job_id: str):
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if job:
        return Job(**job)
    return None


async def get_jobs_by_company_service(company_id: str, skip: int = 0, limit: int = 10):
    pipeline = [
        {"$match": {"company_id": ObjectId(company_id)}},
        {
            "$lookup": {
                "from": "companies",
                "localField": "company_id",
                "foreignField": "_id",
                "as": "company",
            }
        },
        {
            "$addFields": {
                "_id": {"$toString": "$_id"},
                "company_id": {"$toString": "$company_id"},
            }
        },
        {"$unwind": "$company"},
        {"$skip": skip},
        {"$limit": limit},
    ]
    jobs_cursor = db.jobs.aggregate(pipeline)
    jobs = await jobs_cursor.to_list(length=None)
    total_jobs = await db.jobs.count_documents({"company_id": ObjectId(company_id)})
    return jobs, total_jobs


async def increment_company_views(company_id: str):
    result = await db.companies.update_one(
        {"_id": ObjectId(company_id)}, {"$inc": {"views": 1}}
    )
    return result.modified_count > 0
