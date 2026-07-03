import os
import json
import hashlib
from pathlib import Path

import google.generativeai as genai
from dotenv import load_dotenv
CACHE_DIR = Path(__file__).resolve().parent.parent / "cache"

INTERVIEW_CACHE = CACHE_DIR / "interview_cache.json"

RESUME_CACHE = CACHE_DIR / "resume_cache.json"

# Load environment variables (.env locally, Vercel automatically provides them)
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("API KEY EXISTS:", api_key is not None)
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

def load_cache(file_path):
    if file_path.exists():
        with open(file_path, "r") as f:
            return json.load(f)
    return {}


def save_cache(file_path, data):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)


def generate_cache_key(data):
    return hashlib.md5(
        json.dumps(data, sort_keys=True).encode()
    ).hexdigest()

def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert resume analyzer.

Analyze the following resume and return ONLY valid JSON.

The JSON format must be:

{{
  "name": "",
  "email": "",
  "phone": "",
  "education": [],
  "skills": [],
  "projects": [],
  "experience": [],
  "certifications": []
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    return json.loads(text)


def generate_interview_questions(resume_data):
    prompt = f"""
You are an expert technical interviewer.

Generate exactly 25 interview questions based on the candidate's resume.

Return ONLY valid JSON.

The JSON format must be:

[
  {{
    "id": 1,
    "type": "voice",
    "question": ""
  }}
]

Rules:
- Generate exactly 25 questions.
- Randomly assign "voice" or "text" to each question.
- Base every question on the candidate's resume.
- Include technical, project, HR, and behavioral questions.
- Return ONLY JSON.

Candidate Resume:

{json.dumps(resume_data, indent=2)}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    return json.loads(text)


def evaluate_interview_answers(questions, answers):

    cache = load_cache(INTERVIEW_CACHE)

    print("📂 Cache Loaded:")
    print(cache)

    cache_key = generate_cache_key({
        "questions": questions,
        "answers": answers,
    })

    print("🔑 Cache Key:", cache_key)

    if cache_key in cache:
        print("✅ Using Cached Interview Evaluation")
        return cache[cache_key]

    print("❌ Cache Miss - Calling Gemini API...")

    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's interview answers.

Questions:
{json.dumps(questions, indent=2)}

Answers:
{json.dumps(answers, indent=2)}

Return ONLY valid JSON in this format:

{{
  "overall_score": 85,
  "technical_score": 82,
  "communication_score": 88,
  "strengths": [
    "Python",
    "Problem Solving"
  ],
  "weaknesses": [
    "SQL",
    "System Design"
  ],
  "feedback": "Write a detailed interview feedback in about 150 words."
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    print("========== GEMINI RESPONSE ==========")
    print(text)
    print("=====================================")

    result = json.loads(text)

    cache[cache_key] = result

    save_cache(INTERVIEW_CACHE, cache)

    return result