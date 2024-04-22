from fastapi import FastAPI, HTTPException

# CROSS ORIGIN RESOURCE SHARING
# uzywamy kidybackend jest w innym origin niz frontend
from fastapi.middleware.cors import CORSMiddleware
from database import (
  fetch_one_recipe,
  fetch_all_recipes,
  create_recipe,
  update_recipe,
  remove_recipe
)

# APP OBJECT
app = FastAPI()

# pozwalamy na headers, methods zeby sie komunikowalo git
origins = ['https://localhost:3000']

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials= True,
  allow_methods= ["*"],
  allow_headers = ["*"],
)

@app.get("/")
async def read_root():
  return {"message": "hello"}

@app.get("/api/recipe/{id}")
async def get_recipe_by_id(id):
  return 1

@app.get("/api/recipes/newest")
async def get_newest():
  return 1

@app.get("/api/recipes/trending")
async def get_trending():
  return 1

@app.get("/api/recipes/{user}")
async def get_user_recipes(user):
  return 1

@app.post("/api/recipe")
async def post_recipe(recipe):
  return 1

@app.put("/api/recipe/{id}")
async def update_recipe(id):
  return 1

@app.delete("/api/recipe/{id}")
async def delete_recipe(id):
  return 1



