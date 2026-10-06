import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

def get_auth_headers():
    token = create_access_token({"sub": "r_1001", "hemis_id": "381211100123"})
    return {"Authorization": f"Bearer {token}"}

def test_list_sections():
    response = client.get("/api/v1/sections", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "name" in data[0]
    assert "children" in data[0]

def test_list_filters():
    response = client.get("/api/v1/filters", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert "languages" in data
    assert "types" in data
