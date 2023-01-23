import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ModelInput(BaseModel):
    instances: list


@app.post("/machine-failure/predict")
async def predict(input: ModelInput):
    res = httpx.post(
        url='http://models:8501/v1/models/machine-failure:predict',
        json=input.dict()
    )

    if res.status_code != 200:
        raise HTTPException(res.status_code, res.json())

    return res.json()['predictions']


@app.get("/")
def root():
    return 'Welcome!'
