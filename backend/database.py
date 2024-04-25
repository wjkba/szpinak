from models import Recipe, NewRecipe
from datetime import datetime


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

async def fetch_all_recipes():
  recipes = []
  cursor = recipes_collection.find({})
  async for document in cursor:
    recipes.append(Recipe(**document))
  return recipes


# rozwiazanie id tymczasowe, 
# razem z object id tworze zwykle cyfrowe id
# TODO: id ma byc tworzone na podstawie najwyzszego id a nie dlugosci kolekcji
async def create_new_recipe(new_recipe):
  date_string = (datetime.now()).strftime("%Y-%m-%d")
  # sprawdz ile jest dokumentow w kolekcji
  n = await recipes_collection.count_documents({})
  # id to liczba dokumentow w kolekcji + 1
  document = Recipe(id=n+1, title=new_recipe['title'], image=new_recipe['image'], description=new_recipe['description'], views=1, rating=5, time=new_recipe['time'], ingredients=new_recipe['ingredients'], instructions=new_recipe['instructions'], date=date_string)
  result = await recipes_collection.insert_one(document.model_dump())
  return document

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
  document = User
  await users_collection.insert_one(document)
  return document
  
