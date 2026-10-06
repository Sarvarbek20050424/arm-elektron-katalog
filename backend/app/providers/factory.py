from app.providers.base import LibraryProvider


def get_provider(provider_type: str) -> LibraryProvider:
    if provider_type == "mock":
        from app.providers.mock.provider import MockProvider
        return MockProvider()
    elif provider_type == "onec":
        raise NotImplementedError("OneCProvider hali yaratilmagan")
    else:
        raise ValueError(f"Noma'lum provider turi: {provider_type}")
