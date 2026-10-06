from fastapi import APIRouter, Request
from app.schemas.auth import LoginRequest, LoginResponse, TokenRefreshRequest, TokenRefreshResponse
from app.services.auth_service import auth_service
from app.core.rate_limit import ip_limiter, hemis_limiter

router = APIRouter(tags=["Auth"])

@router.post("/auth/login", response_model=LoginResponse)
async def login(request: Request, login_data: LoginRequest):
    ip_limiter.check(request.client.host)
    hemis_limiter.check(login_data.hemis_id)
    return await auth_service.login(login_data.hemis_id, login_data.password)

@router.post("/auth/refresh", response_model=TokenRefreshResponse)
async def refresh_token(refresh_data: TokenRefreshRequest):
    return await auth_service.refresh(refresh_data.refresh_token)

@router.post("/auth/logout")
async def logout():
    return {"message": "Muvaffaqiyatli chiqildi"}
