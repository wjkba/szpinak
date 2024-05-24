from models import Recipe, NewRecipe
from datetime import datetime
from fastapi import HTTPException

# MongoDB driver
import motor.motor_asyncio

# dla polaczenia database.py z mongodb
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

database = client["szpinak_db"]
recipes_collection = database["recipes"]
users_collection = database["users"]



async def fetch_one_recipe(title):
  document = await recipes_collection.find_one({"title": title})
  return document

async def fetch_recipe_by_id(recipe_id: int):
  recipe = []
  recipe_id = int(recipe_id)
  cursor = recipes_collection.find({"id": recipe_id})
  async for document in cursor:
    del document["_id"]
    recipe.append(document)
  return recipe
  


async def fetch_all_recipes():
  recipes = []
  cursor = recipes_collection.find({})
  async for document in cursor:
    recipes.append(Recipe(**document))  
  return recipes



async def fetch_newest_recipes(n):
  recipes = []
  cursor = recipes_collection.find({})
  async for document in cursor:
    del document["_id"]
    recipes.append(document)
  newest_to_oldest = sorted(recipes, key=lambda recipe: recipe["date"], reverse=True)
  return newest_to_oldest[:n]

async def fetch_most_viewed_recipes(n):
  recipes = []
  cursor = recipes_collection.find({})
  async for document in cursor:
    del document["_id"]
    recipes.append(document)
  most_viewed = sorted(recipes, key=lambda recipe: recipe["views"], reverse = True)
  return most_viewed[:n]
  

# obok object id tworze proste liczbowe id

async def create_new_recipe(new_recipe, username):
  ids = []
  cursor = recipes_collection.find({})
  async for document in cursor:
    ids.append(document["id"])
  date_string = (datetime.now()).strftime("%Y-%m-%d")
  document = Recipe(id=max(ids)+1, author=username, title=new_recipe['title'], image=new_recipe['image'], description=new_recipe['description'], views=1, rating=5, time=new_recipe['time'], ingredients=new_recipe['ingredients'], instructions=new_recipe['instructions'], date=date_string)
  result = await recipes_collection.insert_one(document.model_dump())
  return result

async def update_recipe(id, title, description, image, time, ingredients, instructions):
  await recipes_collection.update_one({"id":id},{"$set":{
    "title": title
  }})
  document = await recipes_collection.find_one({"id":id})
  return document

async def remove_recipe(id):
  await recipes_collection.delete_one({"id":id})
  return True

async def create_user(User):
  username = User["username"]
  username_exists = await users_collection.find_one({"username":username})
  if username_exists:
    raise HTTPException(status_code=409, detail="User already exists")
  document = User
  await users_collection.insert_one(document)
  return {"message": f"user: {username} has been created."}

# async def add_to_saved(recipe_id, username):
#   document = await users_collection.find_one({"username": username})
#   if document:
#     isAlreadySaved = await users_collection.find_one({"username": username, "saved": recipe_id})
#     if(isAlreadySaved):
#       return {"message": "Recipe is already saved"}
#     await users_collection.update_one({"username": username}, {"$push": {"saved": recipe_id}})
#     return {"message": "Recipe has been saved"}
#   else:
#     raise HTTPException(status_code=400, detail="Something went wrong")

async def add_to_saved(recipe_id, username):
  document = await users_collection.find_one({"username": username})
  if document:
      recipe = await recipes_collection.find_one({"id": recipe_id})
      await users_collection.update_one({"username": username}, {"$push": {"saved": recipe}})
      return {"message": "Recipe has been saved"}
  else:
    raise HTTPException(status_code=400, detail="Something went wrong")
  
async def remove_from_saved(recipe_id, username):
  document = await users_collection.find_one({"username": username})
  if document:
    await users_collection.update_one({"username": username}, {"$pull": {"saved": {"id": recipe_id}}})
    return {"message": "Recipe has been removed from saved"}
  else:
    raise HTTPException(status_code=400, detail="Something went wrong")
  

async def fetch_saved_recipes(username):
  saved_recipes = []
  document = await users_collection.find_one({"username": username})
  if document:
    saved = document.get("saved", [])
    for recipe in saved:
      del recipe["_id"]
      saved_recipes.append(recipe)
  return saved_recipes

async def fetch_user_recipes(username):
  user_recipes = []
  cursor = recipes_collection.find({"author": username})
  async for document in cursor:
    del document["_id"]
    user_recipes.append(document)
  return user_recipes

  

