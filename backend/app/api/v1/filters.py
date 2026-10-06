from fastapi import APIRouter, Depends
from app.services.catalog_service import catalog_service
from app.deps import get_current_user

router = APIRouter(prefix="/filters", tags=["Filters"])

@router.get("")
async def list_filters(current_user = Depends(get_current_user)):
    return await catalog_service.list_filters()
