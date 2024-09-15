# app/services/job_service.py
from typing import Optional
from bson import ObjectId
from api.models.job import Job, JobCreate
from api.dependencies import newgrad_db as db


async def create_job(job: JobCreate):
    job_dict = job.dict()
    result = await db.jobs.insert_one(job_dict)
    job_dict["_id"] = result.inserted_id
    return Job(**job_dict)


async def get_jobs(skip: int = 0, limit: int = 10, search: Optional[str] = None):
    pipeline = []
    if search:
        pipeline.append(
            {
                "$search": {
                    "index": "default",
                    "text": {
                        "query": search,
                        "path": ["position", "company"],
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
            {"$sort": {"_id": 1}},
            {"$skip": skip},
            {"$limit": limit},
        ]
    )

    cursor = db.jobs.aggregate(pipeline)
    jobs = await cursor.to_list(length=limit)
    # Get total count of documents matching the search
    if search:
        count_pipeline = pipeline[:-3] + [{"$count": "total"}]
        count_cursor = db.jobs.aggregate(count_pipeline)
        count_result = await count_cursor.to_list(length=1)
        total_jobs = count_result[0]["total"] if count_result else 0
    else:
        total_jobs = await db.jobs.count_documents({})

    return jobs, total_jobs


async def get_job(job_id: str):
    job = await db.jobs.find_one({"_id": ObjectId(job_id)})
    if job:
        return Job(**job)
    return None


async def get_jobs_by_company_service(company_id: str):
    pipeline = [
        {"$match": {"company.id": ObjectId(company_id)}},
        {
            "$addFields": {
                "_id": {"$toString": "$_id"},
                "company.id": {"$toString": "$company.id"},
            }
        },
    ]
    jobs_cursor = db.jobs.aggregate(pipeline)
    jobs = await jobs_cursor.to_list(length=None)
    company_name = jobs[0]["company"]["name"] if jobs else ""
    return jobs, company_name
