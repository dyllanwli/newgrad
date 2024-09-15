# api/routers/comments.py

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from api.models.comment import Comment, CommentCreate
from api.services.comment_service import create_comment_service, get_comments_by_company_service
from api.utils.clerk import verify_credentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

@router.get("/companies/{company_id}/comments", response_model=List[Comment])
async def read_comments(company_id: str):
    comments = await get_comments_by_company_service(company_id)
    return comments

@router.post("/companies/{company_id}/comments", response_model=Comment)
async def post_comment(
    company_id: str,
    comment: CommentCreate,
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())]
):
    user_session = verify_credentials(credentials)
    if not user_session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    new_comment = await create_comment_service(company_id, comment, user_session["user_id"])
    return new_comment
