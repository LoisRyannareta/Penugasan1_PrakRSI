from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/item")
def create_item():
    return {"message": "Item created"}

@app.get("/item")
def get_item():
    return [
        {"name": "Nasi Goreng", "price": 15000, "category": "Food"},
        {"name": "Sate Ayam", "price": 12000, "category": "Food"},    
        {"name": "Es Teh", "price": 3000, "category": "Drink"},        
    ]

@app.put("/item/{item_id}")
def update_item(item_id: int):
    return {"message": "Item updated"}

@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    return {"message": "Item deleted"}