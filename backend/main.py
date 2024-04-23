from fastapi import FastAPI, HTTPException

# CROSS ORIGIN RESOURCE SHARING
# uzywamy kidybackend jest w innym origin niz frontend
from fastapi.middleware.cors import CORSMiddleware
from model import Recipe, TestModel
from database import (
  fetch_one_recipe,
  fetch_all_recipes,
  create_recipe,
  update_recipe,
  remove_recipe,
  test_create_recipe
)

# APP OBJECT
app = FastAPI()

# pozwalamy na headers, methods zeby sie komunikowalo git
origins = ['*']

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)



@app.get("/api/recipes")
async def get_recipes():
  response = await fetch_all_recipes()
  return response


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

# POST
# @app.post("/api/recipe",tags=["create"] ,response_model=Recipe)
# async def post_recipe(recipe: Recipe):
#   response = await create_recipe(recipe.dict())
#   if response:
#     return response
#   raise HTTPException(400, detail="Something went wrong")

@app.post("/api/recipe", tags=["create"])
async def post_recipe(test_recipe: TestModel):
  response = await test_create_recipe(test_recipe.dict())
  if response:
    return response
  raise HTTPException(400, detail="Something went wrong")  


# UPDATE
@app.put("/api/recipe/{id}")
async def update_recipe(id):
  return 1


# DELETE
@app.delete("/api/recipe/{id}", tags=["delete"])
async def delete_recipe(id: int):
  response = await remove_recipe(id) 
  if response:
    return {"message": f"{id} has been deleted"}
  return HTTPException(status_code=400, detail="Something went wrong")



