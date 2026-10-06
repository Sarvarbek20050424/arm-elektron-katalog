from fastapi import APIRouter, Depends, Query
from app.providers.factory import get_provider
from app.config import settings
from app.deps import get_current_user

router = APIRouter(prefix="/me", tags=["Cabinet"])

@router.get("")
async def get_profile(current_user = Depends(get_current_user)):
    return current_user

@router.get("/loans")
async def get_loans(
    scope: str = Query("active", pattern="^(active|history)$", description="active yoki history"),
    current_user = Depends(get_current_user)
):
    provider = get_provider(settings.PROVIDER)
    is_history = (scope == "history")
    
    loans = await provider.list_loans(current_user.id, history=is_history)
    
    return {"items": loans}
