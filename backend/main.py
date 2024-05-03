
# CROSS ORIGIN RESOURCE SHARING
# uzywamy kidybackend jest w innym origin niz frontend
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
from models import Recipe, NewRecipe, User, NewUser

from database import (
  fetch_one_recipe,
  fetch_all_recipes,
  fetch_newest_recipes,
  fetch_most_viewed_recipes,
  update_recipe,
  remove_recipe,
  create_new_recipe,
  create_user,
  add_to_saved,
  remove_from_saved,
  fetch_saved_recipes,
  fetch_recipe_by_id,
  fetch_user_recipes
)
from auth import (
  get_password_hash,
  get_current_user
)
import auth

# APP OBJECT
app = FastAPI()
app.include_router(auth.router)

# pozwalamy na headers, methods zeby sie komunikowalo git
origins = ['*']

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# AUTH CHECK
@app.get("/authcheck", tags=["auth"])
async def check_auth(current_user = Depends(get_current_user)):
  if current_user is None:
    return{"message": "please log in"}
  return {"message":"Authorized"}

# RECIPES
@app.get("/api/recipes")
async def get_recipes():
  response = await fetch_all_recipes()
  return response

@app.get("/api/recipe/{recipe_id}")
async def get_recipe_by_id(recipe_id):
  response = await fetch_recipe_by_id(recipe_id=recipe_id)
  return response


@app.get("/api/recipes/newest")
async def get_newest(n: int):
  response = await fetch_newest_recipes(n)
  return response

@app.get("/api/recipes/trending")
async def get_trending(n: int):
  response = await fetch_most_viewed_recipes(n)
  return response

@app.get("/api/recipes/{username}")
async def get_user_recipes(username: str):
  response = await fetch_user_recipes(username=username)
  return response


# CREATE RECIPE
@app.post("/api/recipe", tags=["create"])
async def post_recipe(new_recipe: NewRecipe, current_user = Depends(get_current_user)):
  if current_user is None:
    return{"message": "please log in"}
  response = await create_new_recipe(new_recipe.model_dump(), username=current_user["username"])
  if response:
    return {"message": f"Recipe has been created"}
  raise HTTPException(400, detail="Something went wrong")  


# UPDATE RECIPE
@app.put("/api/recipe/{id}")
async def update_recipe(id):
  return 1


# DELETE RECIPE
@app.delete("/api/recipe/{id}", tags=["delete"])
async def delete_recipe(id: int):
  response = await remove_recipe(id) 
  if response:
    return {"message": f"{id} has been deleted"}
  return HTTPException(status_code=400, detail="Something went wrong")


# USERS
@app.post("/api/sign_up", tags=["users"])
async def sign_up(new_user: NewUser):
  user = User(username=new_user.username, password=get_password_hash(new_user.password), saved=[])
  response = await create_user(user.model_dump())
  if response:
    return response
  raise HTTPException(status_code=400, detail="Something went wrong")

@app.post("/api/save_recipe/{recipe_id}")
async def save_recipe(recipe_id: int, current_user = Depends(get_current_user)):
  if current_user is None:
    return{"message": "please log in"}
  response = await add_to_saved(recipe_id=recipe_id,username=current_user["username"])
  return response
  

@app.post("/api/unsave_recipe/{recipe_id}")
async def unsave_recipe(recipe_id:int, current_user = Depends(get_current_user)):
  if current_user is None:
    return{"message": "please log in"}
  response = await remove_from_saved(recipe_id=recipe_id, username=current_user["username"])
  return response

@app.get("/saved-recipes")
async def get_saved_recipes(current_user = Depends(get_current_user)):
  if current_user is None:
    return{"message": "please log in"}
  saved_recipes = await fetch_saved_recipes(current_user["username"])
  return saved_recipes
  
