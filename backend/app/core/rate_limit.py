from collections import defaultdict
import time
from app.core.errors import raise_rate_limit

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def check(self, key: str):
        now = time.time()
        self.requests[key] = [t for t in self.requests[key] if now - t < self.window_seconds]
        if len(self.requests[key]) >= self.max_requests:
            raise_rate_limit("Juda ko'p urinishlar. Iltimos, biroz kuting.")
        self.requests[key].append(now)

# TZ talabi: IP bo'yicha 20/15 daqiqa, HEMIS ID bo'yicha 8/15 daqiqa
ip_limiter = RateLimiter(max_requests=20, window_seconds=900)
hemis_limiter = RateLimiter(max_requests=8, window_seconds=900)
