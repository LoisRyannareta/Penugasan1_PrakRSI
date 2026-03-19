from fastapi import FastAPI
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
    menu_db.append(item.dict())  # simpan ke list
    return {"message": "Item created", "data": item}

# READ (GET)
@app.get("/item")
def get_item():
    return menu_db

# UPDATE (PUT)
@app.put("/item/{item_id}")
def update_item(item_id: int, item: MenuItem):
    if item_id < len(menu_db):
        menu_db[item_id] = item.dict()
        return {"message": "Item updated"}
    return {"message": "Item not found"}

# DELETE (DELETE)
@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    if item_id < len(menu_db):
        menu_db.pop(item_id)
        return {"message": "Item deleted"}
    return {"message": "Item not found"}