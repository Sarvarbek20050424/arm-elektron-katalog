from app.providers.factory import get_provider
from app.config import settings

class CatalogService:
    def __init__(self):
        self.provider = get_provider(settings.PROVIDER)

    async def list_books(self, query):
        return await self.provider.list_books(query)

    async def get_book(self, book_id: str):
        return await self.provider.get_book(book_id)

    async def list_sections(self):
        return await self.provider.list_sections()

    async def list_filters(self):
        return await self.provider.list_filters()

catalog_service = CatalogService()
