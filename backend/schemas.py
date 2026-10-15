from pydantic import BaseModel

class RequestCreate(BaseModel):
    room: str
    date: str
    payment: str