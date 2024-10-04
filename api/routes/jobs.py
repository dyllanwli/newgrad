# api/routers/jobs.py
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
from api.models.user import UserJobApplication
from api.models.job import Job, JobCreate
from api.services.job_service import (
    create_job_queue,
    update_job,
    delete_job,
    get_jobs,
    get_jobs_by_company_service,
    increment_company_views,
    get_job_by_id,
)
from api.services.user_service import update_job_applications_by_id
from api.utils.auth import verify_credentials, HTTPCredentials
from api.models.user import ApplicationStatus
import logging

router = APIRouter()

logger = logging.getLogger(__name__)


class JobsResponse(BaseModel):
    jobs: List[Job]
    totalPages: int


@router.get("/jobs", response_model=JobsResponse)
async def read_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(
        None, description="Search term for position and company"
    ),
):
    skip = (page - 1) * limit
    search = search.lower() if search else None
    jobs, total_jobs = await get_jobs(
        skip=skip, limit=limit, search=search, where="jobs"
    )
    return {"jobs": jobs, "totalPages": (total_jobs + limit - 1) // limit}


@router.post("/post_job_request", response_model=Job)
async def create_new_job(
    job: JobCreate,
    credentials: HTTPCredentials,
):
    _ = verify_credentials(credentials)
    new_job = await create_job_queue(job)
    return new_job


@router.get("/jobs_queue", response_model=JobsResponse)
async def read_jobs_queue(
    credentials: HTTPCredentials,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(
        None, description="Search term for position and company"
    ),
):
    _ = verify_credentials(credentials)
    skip = (page - 1) * limit
    search = search.lower() if search else None
    jobs, total_jobs = await get_jobs(
        skip=skip, limit=limit, search=search, where="queue"
    )
    return {"jobs": jobs, "totalPages": (total_jobs + limit - 1) // limit}


@router.post("/update_job", response_model=Job)
async def create_or_update_job(
    job: JobCreate,
    delete_queue: bool,
    credentials: HTTPCredentials,
):
    _ = verify_credentials(credentials)
    new_job = await update_job(job)
    if delete_queue:
        await delete_job(new_job.id, where="queue")
    return new_job


@router.delete("/jobs_queue/{job_id}")
async def delete_job_where(
    credentials: HTTPCredentials,
    job_id: str,
    where: str,
):
    _ = verify_credentials(credentials)
    result = await delete_job(job_id, where=where)
    if not result:
        raise HTTPException(status_code=404, detail="Job not found")
    return result


@router.get("/companies/{company_id}/jobs", response_model=JobsResponse)
async def get_jobs_by_company(
    company_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    skip = (page - 1) * limit
    jobs, total_jobs = await get_jobs_by_company_service(
        company_id, skip=skip, limit=limit
    )
    success = await increment_company_views(company_id)
    if not success:
        logger.error("increment_company_views error")
    return {"jobs": jobs, "totalPages": (total_jobs + limit - 1) // limit}

@router.post("/jobs/apply")
async def handle_job_apply(job_id: str, user_id: Optional[str] = None):
    job = await get_job_by_id(job_id)
    if not job:
        logger.error("Job not found")
    if user_id:
        job_application = UserJobApplication(
            status=ApplicationStatus.SAVED,
            job_id=job_id,
            job=job,
        )
        await update_job_applications_by_id(user_id, job_application)
    return job