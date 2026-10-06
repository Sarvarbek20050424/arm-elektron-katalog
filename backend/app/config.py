from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROVIDER: str = "mock"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:5173",
        "http://localhost:80",
        "https://arm-elektron-katalog.netlify.app",
        "https://*.netlify.app",  # Barcha Netlify preview URL'lari uchun
    ]

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
