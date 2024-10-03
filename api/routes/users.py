from fastapi import APIRouter, HTTPException, Depends
from api.models.user import User, UserCreate
from api.services.user_service import get_or_create_user, get_user_with_job_applications
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
