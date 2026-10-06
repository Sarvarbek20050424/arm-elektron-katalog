import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_success():
    response = client.post("/api/v1/auth/login", json={
        "hemis_id": "381211100123",
        "password": "test123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["reader"]["hemis_id"] == "381211100123"

def test_login_invalid_credentials():
    response = client.post("/api/v1/auth/login", json={
        "hemis_id": "381211100123",
        "password": "wrong"
    })
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "invalid_credentials"

def test_login_missing_fields():
    response = client.post("/api/v1/auth/login", json={})
    assert response.status_code == 422

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
