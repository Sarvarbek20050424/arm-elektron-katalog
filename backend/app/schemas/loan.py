from pydantic import BaseModel
from typing import Optional, Literal
from datetime import date


class LoanBook(BaseModel):
    id: str
    title: str
    author: str
    cover_url: Optional[str] = None


class Loan(BaseModel):
    book: LoanBook
    taken_at: date
    due_at: date
    returned_at: Optional[date] = None
    overdue: bool
