function SkillsCard({ skills }) {
    return (
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="mb-4 text-xl font-bold text-amber-700">
          🛠 Skills
        </h3>
  
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  export default SkillsCard