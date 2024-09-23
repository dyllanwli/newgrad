from api.dependencies import newgrad_db as db
from api.models.discussion import Discussion, DiscussionCreate
from fastapi import HTTPException
from bson import ObjectId
from typing import List, Optional
from api.dependencies import newgrad_db as db


async def create_discussion_service(
    discussion: DiscussionCreate, user_id: str, username: str
):
    discussion_dict = discussion.dict()
    discussion_dict["user_id"] = user_id
    discussion_dict["username"] = username
    result = await db.discussions.insert_one(discussion_dict)
    discussion_dict["_id"] = result.inserted_id
    return Discussion(**discussion_dict)

async def get_discussion_service(discussion_id: str):
    discussion = await db.discussions.find_one({"_id": ObjectId(discussion_id)})
    if discussion is None:
        raise HTTPException(status_code=404, detail="Discussion not found")
    return Discussion(**discussion)

async def get_all_discussions_service(search: Optional[str] = None) -> List[Discussion]:
    query = {}
    if search:
        query = {
            "$or": [
                {"title": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}}
            ]
        }
    discussions = await db.discussions.find(query, {"content": 0, "tags": 0}).to_list(length=None)
    return discussions

async def get_all_company_discussions_service(search: Optional[str] = None) -> List[Discussion]:
    query = {}
    if search:
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
            ]
        }
    discussions = await db.companies.find(query, {"content": 0, "tags": 0}).sort("views", -1).to_list(length=None)
    return discussions