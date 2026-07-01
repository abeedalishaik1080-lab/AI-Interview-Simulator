import PersonalInfo from "./PersonalInfo"
import SkillsCard from "./SkillsCard"
import EducationCard from "./EducationCard"
import StartInterviewButton from "./StartInterviewButton"

function CandidateProfile({ resumeData }) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          Candidate Profile
        </h2>
  
        <PersonalInfo resumeData={resumeData} />
  
        <SkillsCard skills={resumeData.skills} />

        <EducationCard education={resumeData.education} />
        
        <StartInterviewButton />
      </div>
    )
  }
  
  export default CandidateProfile