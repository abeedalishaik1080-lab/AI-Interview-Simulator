import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { generateInterview } from "../services/uploadService"
function Interview() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [voiceAnswers, setVoiceAnswers] = useState({})
  const [textAnswer, setTextAnswer] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await generateInterview()
  
        setQuestions(data.questions)
  
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
  
    loadQuestions()
  }, [])

  useEffect(() => {
  setTextAnswer(answers[currentQuestion] || "")

  if (voiceAnswers[currentQuestion]) {
    setAudioBlob(voiceAnswers[currentQuestion])
    setAudioUrl(URL.createObjectURL(voiceAnswers[currentQuestion]))
  } else {
    setAudioBlob(null)
    setAudioUrl("")
  }
}, [currentQuestion, answers, voiceAnswers])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
  
      const recorder = new MediaRecorder(stream)

const chunks = []

recorder.ondataavailable = (event) => {
  chunks.push(event.data)
}

recorder.onstop = () => {
  const blob = new Blob(chunks, { type: "audio/webm" })

setAudioBlob(blob)
setAudioUrl(URL.createObjectURL(blob))

setVoiceAnswers((prev) => ({
  ...prev,
  [currentQuestion]: blob,
  }))
}

recorder.start()

setMediaRecorder(recorder)
setIsRecording(true)
    } catch (error) {
      console.error("Recording Error:", error)
      alert(error.message)
    }
  }
  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

        <h1 className="text-4xl font-extrabold text-center text-white">
          🤖 AI Interview Simulator
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Welcome to your AI Interview
        </p>

        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800/70 p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-white">
          Question {currentQuestion + 1} / {questions.length}
        </h2>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-700">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-slate-900 border border-slate-700 p-6">

          {!loading && (
            <p className="mb-4 text-sm font-bold text-indigo-400">
              {questions[currentQuestion]?.type === "voice"
                ? "🎤 Voice Question"
                : "⌨️ Text Question"}
            </p>
        )}

        <p className="text-xl leading-8 text-white">
          {loading
            ? "Loading question..."
            : questions[currentQuestion]?.question}
        </p>
        {!loading &&
  (questions[currentQuestion]?.type === "voice" ? (
    <div className="mt-6">
  <button
    onClick={isRecording ? stopRecording : startRecording}
    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40"
  >
    {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
  </button>

  {audioUrl && (
    <div className="mt-4">
      <audio controls src={audioUrl}></audio>

      <button
        onClick={() => {
          setAudioBlob(null)
          setAudioUrl("")
        }}
        className="ml-4 rounded-xl bg-slate-700 px-4 py-2 font-semibold text-white transition-all hover:scale-105 hover:bg-slate-600"
      >
        🔄 Record Again
      </button>
    </div>
  )}
</div>
  ) : (
    <div className="mt-6">
      <textarea
        placeholder="Type your answer here..."
        rows={5}
        value={textAnswer}
        onChange={(e) => setTextAnswer(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
      />

      <button
        onClick={() => {
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: textAnswer,
          }))

          alert("✅ Answer Saved Successfully")
        }}
        className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40"
      >
        Save Answer
      </button>
    </div>
  ))}

      </div>

          <div className="mt-8 flex justify-between">

          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1)
              }
            }}
            disabled={currentQuestion === 0}
            className={`rounded-xl px-6 py-3 font-semibold transition-all ${
              currentQuestion === 0
                ? "cursor-not-allowed bg-slate-700 text-slate-500"
                : "bg-slate-700 text-white hover:scale-105 hover:bg-slate-600"
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
              } else {
                navigate("/results", {
                  state: {
                    questions,
                    answers,
                    voiceAnswers,
                  },
                })
              }
            }}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40"
          >
            {currentQuestion === questions.length - 1
              ? "Finish Interview"
              : "Next"}
          </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Interview