from fastapi import APIRouter
from app.api.v1 import auth, books, sections, filters, me, health

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(books.router)
api_router.include_router(sections.router)
api_router.include_router(filters.router)
api_router.include_router(me.router)
api_router.include_router(health.router)
