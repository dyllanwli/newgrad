# api/routers/companies.py

from fastapi import APIRouter, Query
from typing import List, Optional
from api.models.company import Company
from api.models.discussion import Discussion
from api.utils.auth import verify_credentials, HTTPCredentials
from api.services.company_service import get_companies
from api.services.discussion_service import get_all_company_discussions_service

router = APIRouter()


@router.get("/companies/search", response_model=List[Company])
async def search_companies(
    credentials: HTTPCredentials, query: str = Query(..., min_length=1)
):
    verify_credentials(credentials)
    companies = await get_companies(query)
    return companies


@router.get("/companies/discussions", response_model=List[Discussion])
async def get_company_discussions(search: Optional[str] = None):
    discussions = await get_all_company_discussions_service(search)
    return discussions
