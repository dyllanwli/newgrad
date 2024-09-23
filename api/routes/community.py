from fastapi import APIRouter
from api.models.discussion import DiscussionCreate, Discussion
from api.services.discussion_service import create_discussion_service, get_discussion_service
from api.utils.auth import verify_credentials, HTTPCredentials

router = APIRouter()


@router.post("/discussions", response_model=Discussion)
async def create_discussion(
    discussion: DiscussionCreate,
    credentials: HTTPCredentials,
):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    username = user_session["username"]

    new_discussion = await create_discussion_service(discussion, user_id, username)
    return new_discussion


@router.get("/discussions/{discussion_id}", response_model=Discussion)
async def get_discussion(discussion_id: str):
    discussion = await get_discussion_service(discussion_id)
    return discussion