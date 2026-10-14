from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

requests_data = [
    {
        "id": 1,
        "room": "Аудитория 101",
        "date": "2026-10-20",
        "payment": "cash",
        "status": "Новая"
    },
    {
        "id": 2,
        "room": "Кинозал",
        "date": "2026-10-22",
        "payment": "sbp",
        "status": "Мероприятие назначено"
    },
    {
        "id": 3,
        "room": "Коворкинг",
        "date": "2026-10-25",
        "payment": "cash",
        "status": "Завершено"
    }
]

@app.get("/requests")
def get_requests():
    return requests_data

