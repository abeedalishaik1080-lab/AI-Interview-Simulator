import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { evaluateInterview } from "../services/uploadService"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

function Results() {
  const { state } = useLocation()
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(true)

  const totalQuestions = state?.questions?.length || 0
  const textAnswers = Object.keys(state?.answers || {}).length
  const voiceAnswers = Object.keys(state?.voiceAnswers || {}).length

  const attempted = textAnswers + voiceAnswers
  useEffect(() => {
    async function loadEvaluation() {
      try {
        const result = await evaluateInterview({
          questions: state?.questions || [],
          answers: state?.answers || {},
        })
  
        setEvaluation(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  
    if (state) {
      loadEvaluation()
    }
  }, [state])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

      <h1 className="text-center text-5xl font-extrabold text-white">
          🎉 Interview Completed
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Your interview has been completed successfully.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">

          <div className="rounded-xl bg-indigo-50 p-6 text-center">
            <p className="text-sm text-slate-500">Questions</p>
            <h2 className="mt-2 text-3xl font-bold">
              {totalQuestions}
            </h2>
          </div>

          <div className="rounded-xl bg-green-50 p-6 text-center">
            <p className="text-sm text-slate-500">Attempted</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {attempted}
            </h2>
          </div>

          <div className="rounded-xl bg-blue-50 p-6 text-center">
            <p className="text-sm text-slate-500">Text Answers</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {textAnswers}
            </h2>
          </div>

          <div className="rounded-xl bg-red-50 p-6 text-center">
            <p className="text-sm text-slate-500">Voice Answers</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {voiceAnswers}
            </h2>
          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-800/70 p-8 shadow-xl backdrop-blur-md">

        <h2 className="text-3xl font-bold text-white">
            🤖 AI Evaluation
          </h2>

          {loading ? (
  <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
    <div className="text-5xl">🤖</div>

    <h2 className="mt-4 text-2xl font-bold">
      AI is analyzing your interview...
    </h2>

    <p className="mt-2 text-slate-500">
      Please wait a few seconds.
    </p>
  </div>
) : (
  <>
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

      <div className="rounded-2xl bg-indigo-600 p-8 text-center text-white shadow-lg">
      <p className="text-lg mb-6">🏆 Overall Score</p>

    <div className="mx-auto h-36 w-36">
    <CircularProgressbar
      value={evaluation?.overall_score ?? 0}
      text={`${evaluation?.overall_score ?? 0}/100`}
      styles={{
        path: {
          stroke: "#22c55e",
        },
        trail: {
          stroke: "#ffffff30",
        },
        text: {
          fill: "#ffffff",
          fontSize: "22px",
          fontWeight: "bold",
        },
      }}
    />
    </div>
      </div>

      <div className="rounded-2xl bg-green-600 p-8 text-center text-white shadow-lg">
        <p className="text-lg">💻 Technical</p>
        <h2 className="mt-4 text-6xl font-bold">
        {evaluation?.technical_score ?? 0}
        </h2>
        <p className="mt-2 text-lg">/100</p>
      </div>

      <div className="rounded-2xl bg-blue-600 p-8 text-center text-white shadow-lg">
  <p className="text-lg">🗣 Communication</p>
  <h2 className="mt-4 text-6xl font-bold">
    {evaluation?.communication_score ?? 0}
  </h2>
  <p className="mt-2 text-lg">/100</p>
</div>

</div>

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

  <div className="rounded-2xl bg-green-50 p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-green-700">
      ✅ Strengths
    </h2>

    <ul className="mt-4 space-y-3">
      {evaluation?.strengths?.length ? (
        evaluation.strengths.map((item, index) => (
          <li
            key={index}
            className="rounded-lg bg-white p-3 shadow"
          >
            ✔ {item}
          </li>
        ))
      ) : (
        <p className="text-slate-500">
          No strengths identified.
        </p>
      )}
    </ul>

  </div>

  <div className="rounded-2xl bg-red-50 p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-red-700">
      ⚠ Needs Improvement
    </h2>

    <ul className="mt-4 space-y-3">
      {evaluation?.weaknesses?.length ? (
        evaluation.weaknesses.map((item, index) => (
          <li
            key={index}
            className="rounded-lg bg-white p-3 shadow"
          >
            • {item}
          </li>
        ))
      ) : (
        <p className="text-slate-500">
          No weaknesses identified.
        </p>
      )}
    </ul>

  </div>

</div>

  

<div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">

  <h2 className="text-2xl font-bold text-indigo-700">
    🤖 AI Feedback
  </h2>

  <p className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-700">
    {evaluation?.feedback || "No feedback available."}
  </p>

</div>

</>
)}

        </div>

      </div>
    </div>
  )
}

export default Results