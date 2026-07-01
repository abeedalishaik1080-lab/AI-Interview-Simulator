# AI Interview Simulator

A production-ready AI Interview Simulator built with React and FastAPI. Upload a resume, receive personalized interview questions, practice answering them, and get AI-powered feedback with a final performance report.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Python 3.12
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- SQLite

## Project Structure

```
AI-Interview-Simulator/
├── frontend/          # React + Vite frontend
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       └── services/
├── backend/           # FastAPI backend
│   ├── routers/
│   ├── services/
│   ├── models/
│   ├── database/
│   ├── uploads/
│   └── utils/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Health check  |

## License

MIT
