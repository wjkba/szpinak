# do tworzenie json schemas
from pydantic import BaseModel, Field



class Recipe(BaseModel):
      id: int
      title: str = Field(min_length=1, max_length=20)
      image: str = Field(min_length=1)
      description: str = Field(min_length=1)
      views: int
      rating: int
      time: str
      ingredients: str
      instructions: str
      date: str

class TestModel(BaseModel):
      title: str = Field(min_length=1, max_length=20)
      image: str = Field(min_length=1)
      description: str = Field(min_length=1)
      time: str
      ingredients: str
      instructions: str
      