from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date


class SectionRef(BaseModel):
    id: str
    name: str
    path: List[str]


class BookSummary(BaseModel):
    id: str
    title: str
    author: str
    year: int
    language: str
    type: str
    cover_url: Optional[str] = None
    section: SectionRef
    status: Literal["available", "borrowed", "unavailable"]
    copies_total: int
    copies_available: int


class Copy(BaseModel):
    barcode: str
    inventory_number: str
    section: str
    status: Literal["available", "borrowed", "unavailable"]
    due_at: Optional[date] = None


class BookDetail(BaseModel):
    id: str
    title: str
    author: str
    publisher: Optional[str] = None
    city: Optional[str] = None
    year: int
    pages: Optional[str] = None
    language: str
    type: str
    isbn: Optional[str] = None
    udk: Optional[str] = None
    kbk: Optional[str] = None
    annotation: Optional[str] = None
    editor: Optional[str] = None
    translator: Optional[str] = None
    cover_url: Optional[str] = None
    section: SectionRef
    status: Literal["available", "borrowed", "unavailable"]
    copies_total: int
    copies_available: int
    nearest_due_at: Optional[date] = None
    copies: List[Copy] = []


class BookQuery(BaseModel):
    q: Optional[str] = None
    section_id: Optional[str] = None
    status: Optional[Literal["available", "borrowed", "unavailable"]] = None
    language: Optional[str] = None
    type: Optional[str] = None
    year_from: Optional[int] = None
    year_to: Optional[int] = None
    sort: Optional[str] = None
    page: int = Field(1, ge=1)
    page_size: int = Field(20, ge=1, le=50)
