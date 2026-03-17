from fastapi import FastAPI

app = FastAPI()

@app.post("/item")
def create_item():
    return {"message": "Item created"}

@app.get("/item")
def get_item():
    return {"message": "Item list"}

@app.put("/item/{item_id}")
def update_item(item_id: int):
    return {"message": "Item updated"}

@app.delete("/item/{item_id}")
def delete_item(item_id: int):
    return {"message": "Item deleted"}