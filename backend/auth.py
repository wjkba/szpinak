from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import jwt, JWTError
import motor.motor_asyncio
from database import (
  database,
  users_collection
)

router = APIRouter()


# PASSLIB
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "7d6477978d331618e4316253809d5b1663a10295fc113b6725debe07cf31b712"
ALGORITHM = "HS256"

@router.get("/verify-token/{token}")
async def test(token: str):
  user = await get_current_user(token=token)
  return {"message": "verified", "username": user["username"]}



def create_access_token(data: dict, expires_delta: timedelta):
  to_encode = data.copy()
  expire = datetime.utcnow() + expires_delta # termin waznosci 30 minut od teraz
  to_encode.update({"exp":expire})
  # to_enocde zawiera sub: username i czas expire
  # to_encode kodujemy za pomoca jwt.encode i wykorzystujemy secret key z algorytmem
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

def get_password_hash(password): # HASHOWANIE HASŁA
  return pwd_context.hash(password)

# Token autoryzuje uzytkownika bez koniecznosci 
# logowania tak dlugo jak token jest wazny
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/v")
# pytamy czy klient ma token, jesli ma to dajemy dostęp do endpointa
# jeśli klient nie ma tokena to idź do tokenUrl
async def validate_token(token: str = Depends(oauth2_scheme)): 
  return {"token": token}

async def authenticate_user(username, password):
  user = await users_collection.find_one({"username": username})
  if user:
    password_check = pwd_context.verify(password, user["password"])
    return password_check
  return False

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
  username = form_data.username
  password = form_data.password
  authenticated = await authenticate_user(username, password)
  if authenticated:
    access_token = create_access_token(data={"sub":username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}
  else:
    raise HTTPException(status_code=400, detail="Incorrect username or password")
  
async def get_current_user(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
    username: str = payload.get("sub")
    if username is None:
      raise HTTPException()
    return {"username": username}
  except JWTError:
    raise HTTPException(status_code=400, detail="error")