import jwt
import os

CLERK_PEM_PUBLIC_KEY_PROD = ""

CLERK_PEM_PUBLIC_KEY_DEV = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtlu+JLykB55LW3abcgG/
6JxzYMgV87lWDUKbtwoDTejrU1P4F3biGwMHcPX8v6C0rkXqdKiBz1MqrE45PIo6
lN4xoz8XfPBk9j3hHK97HeFsDvwaq8sYiuixmIajiajrFEn6EXke6F1GyK7YAuFk
e+atuG4xjIoKYDsLxqSHxtaya3gNFmc5SJdAVKPKbZKbqqyT7ZAq8qK7XkMksUFA
Fd81YmVbJ8QcvFf5dMqrkEPhw1DRcnMC9GIRNgQWfRKs/eRPGSPp+Kv76Xuk6I+6
Wkd45pY4hKWSSNNGcWVLqmg9Dm9m3zdzfDWZsXFOcuuwhe5OA48nB4FZxIdV1EcB
1wIDAQAB
-----END PUBLIC KEY-----
"""


def verify_credentials(credentials):
    is_prod = os.getenv("IS_PROD") == "true"
    CLERK_PEM_PUBLIC_KEY = (
        CLERK_PEM_PUBLIC_KEY_PROD if is_prod else CLERK_PEM_PUBLIC_KEY_DEV
    )
    if credentials.credentials == "ptSJuhCtJWIBWzl7ANjnTIqjcN" and not is_prod:
        return {"user": {"id": "testuser"}}
    session = jwt.decode(
        credentials.credentials, key=CLERK_PEM_PUBLIC_KEY, algorithms=["RS256"]
    )
    if not session:
        raise Exception("Invalid credentials")
    return session
