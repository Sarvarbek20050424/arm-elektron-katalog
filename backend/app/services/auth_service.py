from datetime import timedelta
from app.config import settings
from app.providers.factory import get_provider
from app.core.security import create_access_token, create_refresh_token, decode_token
from app.core.errors import raise_invalid_credentials

class AuthService:
    def __init__(self):
        self.provider = get_provider(settings.PROVIDER)

    async def login(self, hemis_id: str, password: str) -> dict:
        reader = await self.provider.authenticate(hemis_id, password)
        if not reader:
            raise_invalid_credentials()
        
        return {
            "access_token": create_access_token({"sub": reader.id, "hemis_id": reader.hemis_id}),
            "refresh_token": create_refresh_token({"sub": reader.id}),
            "token_type": "bearer",
            "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "reader": reader
        }

    async def refresh(self, refresh_token: str) -> dict:
        try:
            payload = decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise_invalid_credentials()
            
            reader = await self.provider.get_reader(payload.get("sub"))
            if not reader:
                raise_invalid_credentials()
            
            return {
                "access_token": create_access_token({"sub": reader.id, "hemis_id": reader.hemis_id}),
                "refresh_token": create_refresh_token({"sub": reader.id}),
                "token_type": "bearer",
                "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            }
        except ValueError:
            raise_invalid_credentials()

auth_service = AuthService()
