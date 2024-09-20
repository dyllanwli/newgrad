# api/services/company_service.py

from api.dependencies import newgrad_db as db
from typing import List
from api.models.company import Company


async def get_companies(query: str) -> List[Company]:
    companies_cursor = db.companies.find(
        {"name": {"$regex": query, "$options": "i"}}
    ).limit(10)
    companies = await companies_cursor.to_list(length=10)
    return companies
