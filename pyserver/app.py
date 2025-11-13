from fastapi import FastAPI
import psutil
from joblib import load
from pydantic import BaseModel
import pandas as pd

app = FastAPI()
model = load("system_load_model.joblib")

@app.get("/")
def root():
    return {"message": "InsightOps Python service is running 🚀"}

@app.get("/metrics")
def get_metrics():
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent
    return {
        "cpu": cpu,
        "memory": memory
    }
class Metrics(BaseModel):
    cpu: float
    memory: float

@app.post("/predict")
def predict(data: Metrics):
    print(data)
    # Wrap input in DataFrame with column names used during training
    x = pd.DataFrame([[data.cpu, data.memory]], columns=["cpu", "memory"])
    prediction = model.predict(x)
    return {"risk_level": prediction[0]}