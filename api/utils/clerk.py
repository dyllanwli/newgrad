# app/utils/clerk.py
import jwt
import os
from fastapi import HTTPException, status
from api.config import IS_PROD

CLERK_PEM_PUBLIC_KEY_PROD = ""

CLERK_PEM_PUBLIC_KEY_DEV = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArtWTDjgSK3NXjnLIxvf6
iHtKjW3+xvjlj4Kq4Wn9G3nxWUGF0Lv0UI5Psv/ayS5wWKJ+c/fWNF4wDUSyH88p
H6kPCffxcp9j1X2UQlQcHBuhM5MPUciHS8kV5yJg1dzMA0egCIcBjPSt4UXJzQGv
/sMjGix2qijmY7yZEgR6TWRl44iB/xOV24/t6+8MRipBBTMocwRRICy3WSfTrHyD
BXYkGF/F8bwL4xmMcJS723x2ojpR0d+sKDq7wnNK071yI0B/bEkpyS7xk15Ntqoy
y0Enq8VB+qqaYcfFZNz69xywU12g/0dh1qM8TLRtV/7eKGnFI8Sg9neg8og29f99
gQIDAQAB
-----END PUBLIC KEY-----
"""


def verify_credentials(credentials):
    token = credentials.credentials
    try:
        session = jwt.decode(
            token,
            key=CLERK_PEM_PUBLIC_KEY_PROD if IS_PROD else CLERK_PEM_PUBLIC_KEY_DEV,
            algorithms=["RS256"],
        )
        return session
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
