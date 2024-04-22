from model import Recipe

# MongoDB driver
import motor.motor_asyncio

# dla polaczenia database.py z mongodb
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.Recipes
collection = database.recipe

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

async def update_recipe(id, title, description, image, time, ingredients, instructions):
  await collection.update_one({"id":id},{"$set":{
    "title": title
  }})
  document = await collection.find_one({"id":id})
  return document

async def remove_recipe(id):
  await collection.delete_one({"id":id})
  return True

    






placeholderDB = [
  {
    "id": 1,
    "title": "Szpinak dobry",
    "image": "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "lorem ipsum dolor sit amet",
    "views": 120,
    "rating": 5,
    "time": "2 hours",
    "ingredients": "szpinak, sol",
    "instructions": "",
    "date": "2024-04-17"
  },
  {
    "id": 2,
    "title": "Miska szpinak",
    "image": "https://images.pexels.com/photos/1751149/pexels-photo-1751149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "lorem ipsum dolor sit amet",
    "views": 90,
    "rating": 4,
    "time": "30 minutes",
    "ingredients": "szpinak, sol",
    "instructions": "",
    "date": "2024-04-18"
  },
  {
    "id": 3,
    "title": "Tosty szpinak",
    "image": "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "lorem ipsum dolor sit amet",
    "views": 50,
    "rating": 2,
    "time": "10 minutes",
    "ingredients": "szpinak, sol",
    "instructions": "",
    "date": "2024-04-19"
  },
  {
    "id": 4,
    "title": "Szpinak kurczak",
    "image": "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "lorem ipsum dolor sit amet",
    "views": 70,
    "rating": 5,
    "time": "1 hour",
    "ingredients": "szpinak, sol",
    "instructions": "",
    "date": "2024-04-20"
  },
  {
    "id": 5,
    "title": "Szpinakowe nalesniki",
    "image": "https://images.pexels.com/photos/7144449/pexels-photo-7144449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "lorem ipsum dolor sit amet",
    "views": 280,
    "rating": 5,
    "time": "1 hour",
    "ingredients": "szpinak, sol",
    "instructions": "",
    "date": "2024-04-15"
  }
]
