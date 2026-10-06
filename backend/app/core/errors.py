from fastapi import HTTPException
from typing import Optional

class AppError(HTTPException):
    def __init__(
        self,
        status_code: int,
        code: str,
        message: str,
        detail: Optional[dict] = None,
    ):
        super().__init__(
            status_code=status_code,
            detail={"error": {"code": code, "message": message}},
        )
        self.error_code = code
        self.error_message = message


def raise_bad_request(message: str) -> None:
    raise AppError(400, "bad_request", message)


def raise_unauthorized(message: str) -> None:
    raise AppError(401, "unauthorized", message)


def raise_invalid_credentials() -> None:
    raise AppError(401, "invalid_credentials", "HEMIS ID yoki parol noto'g'ri.")


def raise_forbidden(message: str) -> None:
    raise AppError(403, "forbidden", message)


def raise_not_found(message: str) -> None:
    raise AppError(404, "not_found", message)


def raise_rate_limit(message: str) -> None:
    raise AppError(429, "rate_limit", message)


def raise_upstream_unavailable(message: str) -> None:
    raise AppError(503, "upstream_unavailable", message)
