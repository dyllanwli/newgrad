# api/routers/companies.py

from fastapi import APIRouter, Query
from typing import List
from api.models.company import Company
from api.utils.auth import verify_credentials, HTTPCredentials
from api.services.company_service import get_companies

router = APIRouter()


@router.get("/companies/search", response_model=List[Company])
async def search_companies(
    credentials: HTTPCredentials, query: str = Query(..., min_length=1)
):
    verify_credentials(credentials)
    companies = await get_companies(query)
    return companies
