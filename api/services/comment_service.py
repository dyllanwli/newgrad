# api/services/comment_service.py

from fastapi import HTTPException

from api.dependencies import newgrad_db as db
from api.models.comment import Comment, CommentCreate

from datetime import datetime
from bson import ObjectId


async def get_comments_by_company_service(company_id: str):
    cursor = db.comments.find({"company_id": company_id}).sort("datePosted", 1)
    comments = await cursor.to_list(length=None)
    return [Comment(**comment) for comment in comments]


async def create_comment_service(
    company_id: str, comment: CommentCreate, user_id: str, username: str
):
    comment_dict = comment.dict()
    comment_dict["company_id"] = company_id
    comment_dict["userId"] = user_id
    comment_dict["username"] = username
    result = await db.comments.insert_one(comment_dict)
    comment_dict["_id"] = result.inserted_id
    return Comment(**comment_dict)


async def vote_comment_service(comment_id: str, user_id: str, vote_type: int):
    comment_object_id = ObjectId(comment_id)
    existing_vote = await db.votes.find_one(
        {"comment_id": comment_object_id, "user_id": user_id}
    )

    if existing_vote:
        if existing_vote["vote_type"] == vote_type:
            # Remove the vote
            await db.votes.delete_one({"_id": existing_vote["_id"]})
            update_field = "upvote_count" if vote_type == 1 else "downvote_count"
            await db.comments.update_one(
                {"_id": comment_object_id}, {"$inc": {update_field: -1}}
            )
        else:
            # Update the vote
            await db.votes.update_one(
                {"_id": existing_vote["_id"]}, {"$set": {"vote_type": vote_type}}
            )
            # Adjust counts
            if vote_type == 1:
                await db.comments.update_one(
                    {"_id": comment_object_id},
                    {"$inc": {"upvote_count": 1, "downvote_count": -1}},
                )
            else:
                await db.comments.update_one(
                    {"_id": comment_object_id},
                    {"$inc": {"upvote_count": -1, "downvote_count": 1}},
                )
    else:
        # Create a new vote
        vote_doc = {
            "comment_id": comment_object_id,
            "user_id": user_id,
            "vote_type": vote_type,
            "date_voted": datetime.utcnow(),
        }
        await db.votes.insert_one(vote_doc)
        update_field = "upvote_count" if vote_type == 1 else "downvote_count"
        await db.comments.update_one(
            {"_id": comment_object_id}, {"$inc": {update_field: 1}}
        )


async def update_comment_service(
    comment_id: str, comment_update: CommentCreate, user_id: str
):
    comment_object_id = ObjectId(comment_id)
    existing_comment = await db.comments.find_one({"_id": comment_object_id})

    if existing_comment["userId"] != user_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to edit this comment"
        )

    await db.comments.update_one(
        {"_id": comment_object_id}, {"$set": {"content": comment_update.content}}
    )
    updated_comment = await db.comments.find_one({"_id": comment_object_id})
    return Comment(**updated_comment)
