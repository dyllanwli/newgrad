from fastapi import APIRouter, Depends, HTTPException, status, Query
from api.models.job import Job, JobCreate
from api.services.job_service import create_job, get_jobs
from typing import List, Dict
from api.utils.clerk import verify_credentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

router = APIRouter()

security = HTTPBearer()

class JobsResponse(BaseModel):
    jobs: List[Job]
    totalPages: int

@router.get("/jobs", response_model=JobsResponse)
async def read_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    skip = (page - 1) * limit
    jobs, total_jobs = await get_jobs(skip=skip, limit=limit)
    print("Retrieved jobs:", len(jobs))
    print("Job 0:", jobs[0])
    return {"jobs": jobs, "totalPages": (total_jobs + limit - 1) // limit}

@router.post("/jobs", response_model=Job)
async def create_new_job(
    job: JobCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    user_session = verify_credentials(credentials)
    if not user_session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    new_job = await create_job(job)
    return new_job