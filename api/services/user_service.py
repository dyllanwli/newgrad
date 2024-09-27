from api.models.user import User, UserCreate
from api.dependencies import newgrad_db as db

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
