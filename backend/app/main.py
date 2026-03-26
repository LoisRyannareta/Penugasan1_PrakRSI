from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schema
class MenuItem(BaseModel):
    name: str
    price: int
    category: str

# "Database sementara"
menu_db = [
    {"id": 1,"name": "Nasi Goreng", "price": 15000, "category": "Food"},
    {"id": 2,"name": "Mie Ayam", "price": 12000, "category": "Food"},
    {"id": 3,"name": "Es Teh", "price": 3000, "category": "Drink"},
]

# CREATE (POST)
@app.post("/item")
def create_item(item: MenuItem):
    new_id = len(menu_db) + 1

    new_item = {
        "id": new_id,
        "name": item.name,
        "price": item.price,
        "category": item.category
    }

    menu_db.append(new_item)

    return {
        "message": "Item created",
        "data": new_item
    }

# READ (GET)
@app.get("/item")
def get_items():
    return menu_db

# READ ONE (GET by id)
@app.get("/item/{item_id}")
def get_item(item_id: int):
    for item in menu_db:
        if item["id"] == item_id:
            return {
                "code": 200,
                "message": "Item retrieved",
                "data": item
            }
    raise HTTPException(status_code=404, detail="Item not found")

# UPDATE (PUT)
@app.put("/item/{item_id}")
def update_item(item_id: int, item: MenuItem):
    for menu in menu_db:
        if menu["id"] == item_id:
            menu["name"] = item.name
            menu["price"] = item.price
            menu["category"] = item.category
            return {
                "code": 200,
                "message": "Item updated",
                "data": menu
            }
    raise HTTPException(status_code=404, detail="Item not found")

# DELETE (DELETE)
@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    for i, menu in enumerate(menu_db):
        if menu["id"] == item_id:
            deleted_item = menu_db.pop(i)
            return {
                "code": 200,
                "message": "Item deleted",
                "data": deleted_item
            }
    raise HTTPException(status_code=404, detail="Item not found")