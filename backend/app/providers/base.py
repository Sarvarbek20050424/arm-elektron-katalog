from typing import Protocol, runtime_checkable, List, Optional
from app.schemas.auth import ReaderSummary
from app.schemas.book import BookSummary, BookDetail, BookQuery
from app.schemas.section import Section
from app.schemas.loan import Loan


@runtime_checkable
class LibraryProvider(Protocol):
    async def authenticate(self, hemis_id: str, password: str) -> Optional[ReaderSummary]:
        ...

    async def get_reader(self, reader_id: str) -> Optional[ReaderSummary]:
        ...

    async def list_books(self, query: BookQuery) -> dict:
        ...

    async def get_book(self, book_id: str) -> Optional[BookDetail]:
        ...

    async def list_sections(self) -> List[Section]:
        ...

    async def list_filters(self) -> dict:
        ...

    async def list_loans(self, reader_id: str, history: bool = False) -> List[Loan]:
        ...
