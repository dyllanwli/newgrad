# api/routers/jobs.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from pydantic import BaseModel
from api.models.job import Job, JobCreate
from api.services.job_service import create_job, get_jobs
from api.utils.clerk import verify_credentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()

class JobsResponse(BaseModel):
    jobs: List[Job]
    totalPages: int

@router.get("/jobs", response_model=JobsResponse)
async def read_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None, description="Search term for position and company"),
):
    skip = (page - 1) * limit
    search = search.lower() if search else None
    jobs, total_jobs = await get_jobs(skip=skip, limit=limit, search=search)
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
