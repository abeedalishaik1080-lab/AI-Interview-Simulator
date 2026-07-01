from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import (
    generate_interview_questions,
    evaluate_interview_answers,
)

from database.database import SessionLocal
from models.interview import Interview

import json
from datetime import datetime

router = APIRouter(tags=["interview"])


class InterviewRequest(BaseModel):
    answers: dict
    questions: list


@router.post("/generate-interview")
async def generate_interview():
    resume_data = {
        "name": "Abeedali Shaik",
        "skills": [
            "Python",
            "Machine Learning",
            "Database Management",
        ],
        "education": [
            "Bachelor of Technology",
        ],
    }

    questions = generate_interview_questions(resume_data)

    return {
        "questions": questions
    }


@router.post("/evaluate-interview")
async def evaluate_interview(data: InterviewRequest):

    result = evaluate_interview_answers(
        data.questions,
        data.answers,
    )

    db = SessionLocal()

    interview = Interview(
        overall_score=result["overall_score"],
        technical_score=result["technical_score"],
        communication_score=result["communication_score"],
        strengths=json.dumps(result["strengths"]),
        weaknesses=json.dumps(result["weaknesses"]),
        feedback=result["feedback"],
        interview_date=datetime.now().strftime("%d-%m-%Y %H:%M"),
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)
    db.close()

    return result