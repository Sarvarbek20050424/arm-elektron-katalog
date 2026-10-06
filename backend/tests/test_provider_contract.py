import pytest
from app.providers.mock.provider import MockProvider
from app.schemas.book import BookQuery

@pytest.fixture
def provider():
    return MockProvider()

@pytest.mark.asyncio
async def test_provider_authenticate(provider):
    reader = await provider.authenticate("381211100123", "test123")
    assert reader is not None
    assert reader.hemis_id == "381211100123"

@pytest.mark.asyncio
async def test_provider_authenticate_invalid(provider):
    reader = await provider.authenticate("381211100123", "wrong")
    assert reader is None

@pytest.mark.asyncio
async def test_provider_list_books(provider):
    query = BookQuery()
    result = await provider.list_books(query)
    assert "items" in result
    assert "total" in result
    assert len(result["items"]) > 0

@pytest.mark.asyncio
async def test_provider_get_book(provider):
    book = await provider.get_book("b_0001")
    assert book is not None
    assert book.id == "b_0001"
    assert "copies" in book

@pytest.mark.asyncio
async def test_provider_list_sections(provider):
    sections = await provider.list_sections()
    assert len(sections) > 0
    assert sections[0].name is not None

@pytest.mark.asyncio
async def test_provider_list_loans(provider):
    loans = await provider.list_loans("r_1001", history=False)
    assert isinstance(loans, list)
