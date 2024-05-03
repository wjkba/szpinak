# do tworzenie json schemas
from pydantic import BaseModel, Field
from typing import List

class Recipe(BaseModel):
      id: int
      author: str
      title: str = Field(min_length=1, max_length=20)
      image: str = Field(min_length=1)
      description: str = Field(min_length=1)
      views: int
      rating: int
      time: str
      ingredients: str
      instructions: str
      date: str

class NewRecipe(BaseModel):
      title: str = Field(min_length=1, max_length=20)
      image: str = Field(min_length=1)
      description: str = Field(min_length=1)
      time: str
      ingredients: str
      instructions: str
      
class User(BaseModel):
      username: str
      password: str
      saved: List[str]

class NewUser(BaseModel):
      username: str
      password: str