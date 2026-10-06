from pydantic import BaseModel
from typing import Generic, TypeVar, List, Optional

T = TypeVar("T")


class ErrorResponse(BaseModel):
    error: dict


class Page(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
