# api/routers/comments.py

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from api.models.comment import Comment, CommentCreate
from api.services.comment_service import (
    create_comment_service,
    get_comments_by_discuss_service,
    vote_comment_service,
    update_comment_service,
)
from api.utils.clerk import verify_credentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()


@router.get("/discuss/{discuss_id}/comments", response_model=List[Comment])
async def read_comments(discuss_id: str):
    comments = await get_comments_by_discuss_service(discuss_id)
    return comments


@router.post("/discuss/{discuss_id}/comments", response_model=Comment)
async def post_comment(
    discuss_id: str,
    comment: CommentCreate,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())],
):
    user_session = verify_credentials(credentials)
    if not user_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    user_id = user_session["id"]
    username = user_session["username"]

    new_comment = await create_comment_service(discuss_id, comment, user_id, username)
    return new_comment


@router.post("/comments/{comment_id}/vote")
async def vote_comment(
    comment_id: str,
    vote_type: int,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())],
):
    user_session = verify_credentials(credentials)
    if not user_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    user_id = user_session["id"]
    await vote_comment_service(comment_id, user_id, vote_type)
    return {"message": "Vote registered"}


@router.put("/comments/{comment_id}", response_model=Comment)
async def update_comment(
    comment_id: str,
    comment_update: CommentCreate,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())],
):
    user_session = verify_credentials(credentials)
    if not user_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    user_id = user_session["id"]
    updated_comment = await update_comment_service(comment_id, comment_update, user_id)
    return updated_comment
