from fastapi import APIRouter
from app.config import settings

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "provider": settings.PROVIDER}
