from pydantic import BaseModel, Field
from typing import Optional


class LoginRequest(BaseModel):
    hemis_id: str = Field(..., min_length=6, max_length=20)
    password: str = Field(..., min_length=1, max_length=128)


class ReaderSummary(BaseModel):
    id: str
    full_name: str
    hemis_id: str
    faculty: Optional[str] = None
    course: Optional[str] = None
    group: Optional[str] = None


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    reader: ReaderSummary


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class TokenRefreshResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
