from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

items = []

class Item(BaseModel):
    name: str
    description: str | None = None

@app.post("/item")
def create_item(item: Item):
    items.append(item)
    return {
        "code": 200, 
        "message": "Item created", 
        "data": item
    }

@app.get("/item")
def get_items():
    return {
        "code": 200, 
        "message": "Items retrieved", 
        "data": items
    }

@app.get("/item/{item_id}")
def get_item(item_id: int):
    return {
        "code": 200,
        "message": "Item retrieved", 
        "data": items[item_id]
    }

@app.put("/item/{item_id}")
def update_item(item_id: int, item = Item):
    print(item_id)
    it = items[item_id]
    it.nama = item.name
    it.deskripsi = item.description
    return {
        "code": 200,
        "message": "Item updated",
        "data": it
    }

@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    items.pop(item_id)
    return {"code": 200, "message": "Item deleted"}