from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.upload import router as upload_router
from routers.interview import router as interview_router

from database.database import Base, engine
from models.interview import Interview

app = FastAPI(title="AI Interview Simulator API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(interview_router)


@app.get("/")
def root():
    return {"message": "AI Interview Simulator API Running"}