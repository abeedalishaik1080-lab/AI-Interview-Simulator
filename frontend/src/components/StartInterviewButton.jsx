import { useNavigate } from "react-router-dom"
function StartInterviewButton() {
    const navigate = useNavigate()
    return (
      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-center">
        <h3 className="text-2xl font-bold text-indigo-700">
          🚀 Ready for Your Interview?
        </h3>
  
        <p className="mt-3 text-slate-600">
          Your resume has been analyzed successfully.
          <br />
          Click the button below to start your AI interview.
        </p>
  
        <button
          onClick={() => navigate("/interview")}
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
            🚀 Start AI Interview
        </button>
      </div>
    )
  }
  
  export default StartInterviewButton