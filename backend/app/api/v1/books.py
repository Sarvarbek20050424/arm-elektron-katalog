from fastapi import APIRouter, Depends, Query
from app.schemas.book import BookQuery
from app.services.catalog_service import catalog_service
from app.deps import get_current_user

router = APIRouter(prefix="/books", tags=["Books"])

@router.get("")
async def list_books(
    q: str | None = None,
    section_id: str | None = None,
    status: str | None = None,
    language: str | None = None,
    type: str | None = None,
    year_from: int | None = None,
    year_to: int | None = None,
    sort: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    current_user = Depends(get_current_user)
):
    query = BookQuery(
        q=q,
        section_id=section_id,
        status=status,
        language=language,
        type=type,
        year_from=year_from,
        year_to=year_to,
        sort=sort,
        page=page,
        page_size=page_size
    )
    return await catalog_service.list_books(query)

@router.get("/{book_id}")
async def get_book(book_id: str, current_user = Depends(get_current_user)):
    book = await catalog_service.get_book(book_id)
    if not book:
        from app.core.errors import raise_not_found
        raise_not_found("Kitob topilmadi")
    return book
