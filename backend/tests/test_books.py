import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_access_token

client = TestClient(app)

def get_auth_headers():
    token = create_access_token({"sub": "r_1001", "hemis_id": "381211100123"})
    return {"Authorization": f"Bearer {token}"}

def test_list_books_success():
    response = client.get("/api/v1/books", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "page_size" in data

def test_list_books_with_search():
    response = client.get("/api/v1/books?q=algoritm", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) > 0

def test_list_books_with_filter():
    response = client.get("/api/v1/books?status=available", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    for book in data["items"]:
        assert book["status"] == "available"

def test_list_books_with_pagination():
    response = client.get("/api/v1/books?page=2&page_size=10", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert data["page"] == 2
    assert data["page_size"] == 10

def test_get_book_detail():
    response = client.get("/api/v1/books/b_0001", headers=get_auth_headers())
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "b_0001"
    assert "title" in data
    assert "author" in data
    assert "copies" in data

def test_get_book_not_found():
    response = client.get("/api/v1/books/b_9999", headers=get_auth_headers())
    assert response.status_code == 404

def test_list_books_unauthorized():
    response = client.get("/api/v1/books")
    assert response.status_code == 401
