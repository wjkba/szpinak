from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import motor.motor_asyncio
from database import (
  database,
  users_collection
)

app = FastAPI()



# PASSLIB
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# TODO: dodaj token
# Token autoryzuje uzytkownika bez koniecznosci 
# logowania tak dlugo jak token jest wazny
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/v")
# pytamy czy klient ma token, jesli ma to dajemy dostęp do endpointa
# jeśli klient nie ma tokena to idź do tokenUrl
async def validate_token(token: str = Depends(oauth2_scheme)): 
  return {"token": token}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
  username = form_data.username
  password = form_data.password
  authenticated = await authenticate_user(username, password)
  if authenticated:
    return {"access_token": username, "token_type": "bearer"}
  else:
    raise HTTPException(status_code=400, detail="Incorrect username or password")



async def authenticate_user(username, password):
  user = await users_collection.find_one({"username": username})
  if user:
    password_check = pwd_context.verify(password, user["password"])
    return password_check
  return False

def get_password_hash(password): # HASHOWANIE HASŁA
  return pwd_context.hash(password)
