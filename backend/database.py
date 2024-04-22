from model import Recipe, TestModel

# MongoDB driver
import motor.motor_asyncio

# dla polaczenia database.py z mongodb
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")

database = client["szpinak_db"]
collection = database["recipes"]

async def fetch_one_recipe(title):
  document = await collection.find_one({"title": title})
  return document

async def fetch_all_recipes():
  recipes = []
  cursor = collection.find({})
  async for document in cursor:
    recipes.append(Recipe(**document))
  return recipes

async def create_recipe(recipe):
  document = recipe
  result = await collection.insert_one(document)
  return document

async def test_create_recipe(test_recipe):
  document = Recipe(id=9, title=test_recipe['title'], image=test_recipe['image'], description=test_recipe['description'], views=1, rating=1, time=test_recipe['time'], ingredients=test_recipe['ingredients'], instructions=test_recipe['instructions'], date="d").dict()
  result = await collection.insert_one(document)
  return document

async def update_recipe(id, title, description, image, time, ingredients, instructions):
  await collection.update_one({"id":id},{"$set":{
    "title": title
  }})
  document = await collection.find_one({"id":id})
  return document

async def remove_recipe(id):
  await collection.delete_one({"id":id})
  return True

  
