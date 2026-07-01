import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">

        <div className="text-center">

          <div className="text-7xl">🤖</div>

          <h1 className="mt-5 text-4xl font-extrabold text-white">
            AI Interview Simulator
          </h1>

          <p className="mt-4 text-slate-400 leading-7">
            Practice AI-powered interviews, improve your communication,
            and receive instant technical feedback.
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-10 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40"
        >
          🚀 Get Started
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          Powered by Gemini AI
        </p>

      </div>

    </div>
  )
}

export default Login