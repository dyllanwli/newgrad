from fastapi import APIRouter
from typing import List
from api.models.user import User, UserCreate, UserJobApplication
from api.services.user_service import get_or_create_user, get_user_with_job_applications, delete_job_applications_by_ids, update_job_applications_by_id
from api.utils.auth import verify_credentials, HTTPCredentials

router = APIRouter()

@router.get("/profile", response_model=User)
async def get_user_profile(credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    username = user_session["username"]
    email = user_session["email"]

    user_data = UserCreate(username=username, email=email, user_id=user_id)
    user = await get_or_create_user(user_id, user_data)
    return user

@router.get("/profile/job_applications", response_model=User)
async def get_user_job_applications(credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    user = await get_user_with_job_applications(user_id)
    return user

@router.post("/profile/delete_job_applications")
async def delete_job_applications(job_ids: List[str], credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    await delete_job_applications_by_ids(user_id, job_ids)
    return {"message": "Job applications deleted successfully"}

@router.post("/profile/update_job_applications")
async def update_job_applications(job_application: UserJobApplication, credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    await update_job_applications_by_id(user_id, job_application)
    return {"message": "Job application updated successfully"}
