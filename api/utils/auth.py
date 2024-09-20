# app/utils/clerk.py
import jwt
from fastapi import HTTPException, status
from api.config import CLERK_PEM_PUBLIC_KEY
from typing import Annotated
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends


security = HTTPBearer()
HTTPCredentials = Annotated[HTTPAuthorizationCredentials, Depends(HTTPBearer())]


def verify_credentials(credentials):
    token = credentials.credentials
    try:
        session = jwt.decode(
            token,
            key=CLERK_PEM_PUBLIC_KEY,
            algorithms=["RS256"],
        )
        assert session
        return session
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
