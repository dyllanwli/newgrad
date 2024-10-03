from api.dependencies import newgrad_db as db
from api.models.discussion import Discussion, DiscussionCreate
from fastapi import HTTPException
from bson import ObjectId
from typing import List, Optional
from datetime import datetime, timedelta


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
    discussion = await db.discussions.find_one_and_update(
        {"_id": ObjectId(discussion_id)}, {"$inc": {"views": 1}}, return_document=True
    )
    if discussion is None:
        raise HTTPException(status_code=404, detail="Discussion not found")
    return Discussion(**discussion)


async def get_all_discussions_service(
    search: Optional[str] = None, filter_by: Optional[str] = None, user_id: Optional[str] = None
) -> List[Discussion]:
    query = {}
    if search:
        query = {
            "$or": [
                {"title": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}},
            ]
        }

    sort_criteria = None
    if filter_by == "popular":
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        query["created_at"] = {"$gte": thirty_days_ago}
        sort_criteria = [("likes", -1)]
    elif filter_by == "views":
        sort_criteria = [("views", -1)]
    else:
        sort_criteria = [("created_at", -1)]

    discussions_cursor = db.discussions.find(query, {"content": 0, "tags": 0})
    if sort_criteria:
        discussions_cursor = discussions_cursor.sort(sort_criteria)

    discussions = await discussions_cursor.to_list(length=None)
    if user_id:
        user = await db.users.find_one({"user_id": user_id})
        liked_discussions = set(user["liked_discussions"])
        for discussion in discussions:
            discussion["liked"] = str(discussion["_id"]) in liked_discussions
    return discussions


async def get_all_company_discussions_service(
    search: Optional[str] = None,
) -> List[Discussion]:
    query = {}
    if search:
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
            ]
        }
    discussions = (
        await db.companies.find(query, {"content": 0, "tags": 0})
        .sort("views", -1)
        .to_list(length=None)
    )

    return discussions


async def toggle_like_service(discussion_id: str, user_id: str):
    discussion = await db.discussions.find_one({"_id": ObjectId(discussion_id)})
    if discussion is None:
        raise HTTPException(status_code=404, detail="Discussion not found")

    user = await db.users.find_one({"user_id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    liked_discussions = user.get("liked_discussions", [])

    if liked_discussions and discussion_id in liked_discussions:
        # User already liked, so we remove the like
        await db.discussions.update_one(
            {"_id": ObjectId(discussion_id)}, {"$inc": {"likes": -1}}
        )
        await db.users.update_one(
            {"user_id": user_id}, {"$pull": {"liked_discussions": discussion_id}}
        )
        return {"liked": False}
    else:
        # User has not liked yet, so we add the like
        await db.discussions.update_one(
            {"_id": ObjectId(discussion_id)}, {"$inc": {"likes": 1}}
        )
        await db.users.update_one(
            {"user_id": user_id},
            {"$addToSet": {"liked_discussions": discussion_id}},
        )
        return {"liked": True}


async def get_discussions_by_ids(discussion_ids: List[str]) -> List[Discussion]:
    discussion_ids = [ObjectId(id) for id in discussion_ids]
    discussions = await db.discussions.find({"_id": {"$in": discussion_ids}}).to_list(length=None)
    return [Discussion(**discussion) for discussion in discussions]
