from fastapi import APIRouter, Query
from api.models.discussion import DiscussionCreate, Discussion
from api.services.discussion_service import create_discussion_service, get_discussion_service, get_all_discussions_service, toggle_like_service, get_discussions_by_ids
from api.services.user_service import get_user_by_id
from api.utils.auth import verify_credentials, HTTPCredentials
from typing import List, Optional

router = APIRouter()

@router.get("/discussions", response_model=List[Discussion])
async def get_all_discussions(
    search: Optional[str] = Query(None, description="Search term for discussions"),
    filter_by: Optional[str] = Query(None, description="Filter for discussions: 'popular' or 'recent'"),
    user_id: Optional[str] = Query(None, description="User ID for liked discussions")   
):
    discussions = await get_all_discussions_service(search, filter_by, user_id)
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
async def get_discussion(discussion_id: str, user_id: Optional[str] = None):
    discussion = await get_discussion_service(discussion_id)
    if user_id:
        user = await get_user_by_id(user_id)
        liked_discussions = user.liked_discussions or []
        liked = discussion_id in liked_discussions
        discussion.liked = liked
    return discussion


@router.get("/liked-discussions", response_model=List[Discussion])
async def get_liked_discussions(credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    user = await get_user_by_id(user_id)
    liked_discussions = user.liked_discussions or []
    if liked_discussions:
        return await get_discussions_by_ids(liked_discussions)
    else:
        return []


@router.post("/discussions/{discussion_id}/like")
async def toggle_like(discussion_id: str, credentials: HTTPCredentials):
    user_session = verify_credentials(credentials)
    user_id = user_session["id"]
    result = await toggle_like_service(discussion_id, user_id)
    return result