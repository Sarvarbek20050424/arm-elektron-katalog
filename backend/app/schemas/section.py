from pydantic import BaseModel
from typing import List, Optional


class Section(BaseModel):
    id: str
    name: str
    books_count: int = 0
    children: List["Section"] = []


Section.model_rebuild()
