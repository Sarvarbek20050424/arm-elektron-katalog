import json
from pathlib import Path
from typing import List, Optional
from datetime import date

from app.providers.base import LibraryProvider
from app.schemas.auth import ReaderSummary
from app.schemas.book import BookSummary, BookDetail, BookQuery, SectionRef
from app.schemas.section import Section
from app.schemas.loan import Loan, LoanBook


DATA_DIR = Path(__file__).parent / "data"


def _load_json(filename: str) -> list:
    with open(DATA_DIR / filename, "r", encoding="utf-8") as f:
        return json.load(f)


def _get_section_path(sections: list, section_id: str, path: list = None) -> Optional[list]:
    if path is None:
        path = []
    for section in sections:
        current_path = path + [section["name"]]
        if section["id"] == section_id:
            return current_path
        if section.get("children"):
            result = _get_section_path(section["children"], section_id, current_path)
            if result:
                return result
    return None


def _get_section_name(sections: list, section_id: str) -> Optional[str]:
    for section in sections:
        if section["id"] == section_id:
            return section["name"]
        if section.get("children"):
            result = _get_section_name(section["children"], section_id)
            if result:
                return result
    return None


class MockProvider(LibraryProvider):
    def __init__(self):
        self._books = _load_json("books.json")
        self._sections = _load_json("sections.json")
        self._readers = _load_json("readers.json")
        self._loans = _load_json("loans.json")

    async def authenticate(self, hemis_id: str, password: str) -> Optional[ReaderSummary]:
        for reader in self._readers:
            if reader["hemis_id"] == hemis_id and reader["password"] == password:
                return ReaderSummary(
                    id=reader["id"],
                    full_name=reader["full_name"],
                    hemis_id=reader["hemis_id"],
                    faculty=reader.get("faculty"),
                    course=reader.get("course"),
                    group=reader.get("group"),
                )
        return None

    async def get_reader(self, reader_id: str) -> Optional[ReaderSummary]:
        for reader in self._readers:
            if reader["id"] == reader_id:
                return ReaderSummary(
                    id=reader["id"],
                    full_name=reader["full_name"],
                    hemis_id=reader["hemis_id"],
                    faculty=reader.get("faculty"),
                    course=reader.get("course"),
                    group=reader.get("group"),
                )
        return None

    async def list_books(self, query: BookQuery) -> dict:
        books = self._books.copy()

        # Qidiruv
        if query.q:
            q_lower = query.q.lower()
            books = [
                b for b in books
                if q_lower in b["title"].lower()
                or q_lower in b["author"].lower()
                or (b.get("isbn") and q_lower in b["isbn"].lower())
            ]

        # Bo'lim filtri
        if query.section_id:
            books = [b for b in books if b["section_id"] == query.section_id]

        # Holat filtri
        if query.status:
            if query.status == "available":
                books = [b for b in books if b["copies_available"] > 0]
            elif query.status == "borrowed":
                books = [b for b in books if b["copies_available"] == 0 and b["copies_total"] > 0]
            elif query.status == "unavailable":
                books = [b for b in books if b["copies_total"] == 0]

        # Til filtri
        if query.language:
            books = [b for b in books if b["language"] == query.language]

        # Tur filtri
        if query.type:
            books = [b for b in books if b["type"] == query.type]

        # Yil filtri
        if query.year_from:
            books = [b for b in books if b["year"] >= query.year_from]
        if query.year_to:
            books = [b for b in books if b["year"] <= query.year_to]

        # Saralash
        if query.sort == "title":
            books.sort(key=lambda b: b["title"])
        elif query.sort == "author":
            books.sort(key=lambda b: b["author"])
        elif query.sort == "-year":
            books.sort(key=lambda b: b["year"], reverse=True)
        else:
            books.sort(key=lambda b: b["title"])

        # Sahifalash
        total = len(books)
        start = (query.page - 1) * query.page_size
        end = start + query.page_size
        page_books = books[start:end]

        items = []
        for b in page_books:
            section_path = _get_section_path(self._sections, b["section_id"]) or []
            section_name = _get_section_name(self._sections, b["section_id"]) or ""

            if b["copies_available"] > 0:
                status = "available"
            elif b["copies_total"] > 0:
                status = "borrowed"
            else:
                status = "unavailable"

            items.append(BookSummary(
                id=b["id"],
                title=b["title"],
                author=b["author"],
                year=b["year"],
                language=b["language"],
                type=b["type"],
                cover_url=b.get("cover_url"),
                section=SectionRef(
                    id=b["section_id"],
                    name=section_name,
                    path=section_path,
                ),
                status=status,
                copies_total=b["copies_total"],
                copies_available=b["copies_available"],
            ))

        return {
            "items": items,
            "total": total,
            "page": query.page,
            "page_size": query.page_size,
        }

    async def get_book(self, book_id: str) -> Optional[BookDetail]:
        for b in self._books:
            if b["id"] == book_id:
                section_path = _get_section_path(self._sections, b["section_id"]) or []
                section_name = _get_section_name(self._sections, b["section_id"]) or ""

                if b["copies_available"] > 0:
                    status = "available"
                elif b["copies_total"] > 0:
                    status = "borrowed"
                else:
                    status = "unavailable"

                copies = []
                for c in b.get("copies", []):
                    copies.append({
                        "barcode": c["barcode"],
                        "inventory_number": c["inventory_number"],
                        "section": c["section"],
                        "status": c["status"],
                        "due_at": c.get("due_at"),
                    })

                return BookDetail(
                    id=b["id"],
                    title=b["title"],
                    author=b["author"],
                    publisher=b.get("publisher"),
                    city=b.get("city"),
                    year=b["year"],
                    pages=b.get("pages"),
                    language=b["language"],
                    type=b["type"],
                    isbn=b.get("isbn"),
                    udk=b.get("udk"),
                    kbk=b.get("kbk"),
                    annotation=b.get("annotation"),
                    editor=b.get("editor"),
                    translator=b.get("translator"),
                    cover_url=b.get("cover_url"),
                    section=SectionRef(
                        id=b["section_id"],
                        name=section_name,
                        path=section_path,
                    ),
                    status=status,
                    copies_total=b["copies_total"],
                    copies_available=b["copies_available"],
                    nearest_due_at=None,
                    copies=copies,
                )
        return None

    async def list_sections(self) -> List[Section]:
        def build_section(data: dict) -> Section:
            return Section(
                id=data["id"],
                name=data["name"],
                books_count=data.get("books_count", 0),
                children=[build_section(c) for c in data.get("children", [])],
            )

        return [build_section(s) for s in self._sections]

    async def list_filters(self) -> dict:
        languages = set()
        types = set()
        for b in self._books:
            languages.add(b["language"])
            types.add(b["type"])

        return {
            "languages": sorted(list(languages)),
            "types": sorted(list(types)),
        }

    async def list_loans(self, reader_id: str, history: bool = False) -> List[Loan]:
        loans = []
        for loan in self._loans:
            if loan["reader_id"] != reader_id:
                continue

            is_history = loan.get("returned_at") is not None
            if history != is_history:
                continue

            book = next((b for b in self._books if b["id"] == loan["book_id"]), None)
            if not book:
                continue

            taken_at = date.fromisoformat(loan["taken_at"])
            due_at = date.fromisoformat(loan["due_at"])
            returned_at = date.fromisoformat(loan["returned_at"]) if loan.get("returned_at") else None
            overdue = not is_history and date.today() > due_at

            loans.append(Loan(
                book=LoanBook(
                    id=book["id"],
                    title=book["title"],
                    author=book["author"],
                    cover_url=book.get("cover_url"),
                ),
                taken_at=taken_at,
                due_at=due_at,
                returned_at=returned_at,
                overdue=overdue,
            ))

        return loans