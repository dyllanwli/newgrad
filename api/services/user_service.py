from api.models.user import User, UserCreate, UserJobApplication
from api.dependencies import newgrad_db as db
from api.models.job import Job
from fastapi import HTTPException
from api.models.user import ApplicationStatus
from datetime import datetime


async def get_user_by_id(user_id: str) -> User:
    user = await db.users.find_one({"user_id": user_id})
    if user:
        return User(**user)
    return None

async def create_user(user_data: UserCreate) -> User:
    user_dict = user_data.dict()
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    return User(**user_dict)

async def get_or_create_user(user_id: str, user_data: UserCreate) -> User:
    user = await get_user_by_id(user_id)
    if user:
        return user
    return await create_user(user_data)

async def update_job_application_status(job: Job, user_id: str, status: ApplicationStatus):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Find the job application
    job_application = next((job_application for job_application in user.job_applications if job_application.job_id == str(job.id)), None)
    if not job_application:
        job_application = UserJobApplication(
            job_id=str(job.id),
            status=status,
            applied_date=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        user.job_applications.append(job_application)
    else:
        # Update the job application status
        job_application.status = status
        job_application.updated_at = datetime.utcnow()
    
    # Update the user document in the database
    await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"job_applications": [app.dict() for app in user.job_applications]}}
    )

    return user
