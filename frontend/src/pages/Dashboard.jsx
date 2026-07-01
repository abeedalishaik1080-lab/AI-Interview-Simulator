import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-6">

      <div className="w-full max-w-6xl rounded-3xl border border-slate-700 bg-slate-900/80 p-12 shadow-2xl backdrop-blur-xl">

        <h1 className="text-center text-5xl font-extrabold text-white">
          👋 Welcome
        </h1>

        <p className="mt-5 text-center text-lg leading-8 text-slate-400">
          Practice AI-powered technical interviews, upload your resume,
          answer personalized questions, and receive detailed AI feedback
          to improve your interview performance.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">

          <div className="rounded-2xl border border-indigo-500/30 bg-slate-800 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-500">

            <div className="text-5xl">📄</div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Resume Analysis
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Upload your resume and let AI analyze your skills,
              education, projects, and experience.
            </p>

          </div>

          <div className="rounded-2xl border border-green-500/30 bg-slate-800 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-500">

            <div className="text-5xl">🎤</div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              AI Interview
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Get 25 personalized interview questions generated
              from your resume using Gemini AI.
            </p>

          </div>

          <div className="rounded-2xl border border-yellow-500/30 bg-slate-800 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:border-yellow-500">

            <div className="text-5xl">📊</div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              AI Evaluation
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Receive detailed scores, strengths, weaknesses,
              and personalized interview feedback instantly.
            </p>

          </div>

        </div>

        <button
          onClick={() => navigate("/upload")}
          className="mt-12 w-full rounded-xl bg-indigo-600 py-4 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40"
        >
          🚀 Start Interview
        </button>

      </div>

    </div>
  )
}

export default Dashboard