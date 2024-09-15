# api/services/comment_service.py

from api.dependencies import newgrad_db as db
from api.models.comment import Comment, CommentCreate
from datetime import datetime
from bson import ObjectId


async def get_comments_by_company_service(company_id: str):
    cursor = db.comments.find({"company_id": company_id}).sort("datePosted", -1)
    comments = await cursor.to_list(length=None)
    return [Comment(**comment) for comment in comments]


async def create_comment_service(company_id: str, comment: CommentCreate, user_id: str):
    comment_dict = comment.dict()
    comment_dict["company_id"] = company_id
    comment_dict["userId"] = user_id
    result = await db.comments.insert_one(comment_dict)
    comment_dict["_id"] = result.inserted_id
    return Comment(**comment_dict)
