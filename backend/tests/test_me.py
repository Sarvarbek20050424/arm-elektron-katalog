import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

def test_get_profile_success():
    # r_1001 (Aliyev Vali) uchun token yaratamiz
    token = create_access_token({"sub": "r_1001", "hemis_id": "381211100123"})
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get("/api/v1/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    
    assert data["id"] == "r_1001"
    assert data["hemis_id"] == "381211100123"
    assert data["full_name"] == "Aliyev Vali"
    assert data["faculty"] == "Axborot texnologiyalari"
    
    # TZ 1.2 va 8-bo'lim: Shaxsiy ma'lumotlar (pasport, telefon) chiqmasligi kerak
    assert "passport" not in data
    assert "phone" not in data
    assert "jshir" not in data

def test_get_profile_unauthorized():
    response = client.get("/api/v1/me")
    assert response.status_code == 401

def test_get_active_loans():
    token = create_access_token({"sub": "r_1001", "hemis_id": "381211100123"})
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get("/api/v1/me/loans?scope=active", headers=headers)
    assert response.status_code == 200
    data = response.json()
    
    assert "items" in data
    # r_1001 uchun mock ma'lumotlarda 1 ta faol qarz bor (b_0001)
    assert len(data["items"]) == 1
    assert data["items"][0]["book"]["id"] == "b_0001"
    assert data["items"][0]["returned_at"] is None

def test_get_history_loans():
    token = create_access_token({"sub": "r_1001", "hemis_id": "381211100123"})
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.get("/api/v1/me/loans?scope=history", headers=headers)
    assert response.status_code == 200
    data = response.json()
    
    # r_1001 uchun mock ma'lumotlarda 1 ta qaytarilgan qarz bor (b_0015)
    assert len(data["items"]) == 1
    assert data["items"][0]["book"]["id"] == "b_0015"
    assert data["items"][0]["returned_at"] is not None
