from fastapi import APIRouter, Query
from api.models.discussion import DiscussionCreate, Discussion
from api.services.discussion_service import create_discussion_service, get_discussion_service, get_all_discussions_service, toggle_like_service
from api.utils.auth import verify_credentials, HTTPCredentials
from typing import List, Optional

router = APIRouter()

@router.get("/discussions", response_model=List[Discussion])
async def get_all_discussions(
    search: Optional[str] = Query(None, description="Search term for discussions"),
    filter_by: Optional[str] = Query(None, description="Filter for discussions: 'popular' or 'recent'")
):
    discussions = await get_all_discussions_service(search, filter_by)
    return discussions


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


@router.post("/discussions/{discussion_id}/like")
async def toggle_like(discussion_id: str, credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    result = await toggle_like_service(discussion_id, user_id)
    return result