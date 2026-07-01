function EducationCard({ education }) {
    return (
      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="mb-4 text-xl font-bold text-green-700">
          🎓 Education
        </h3>
  
        {education?.length > 0 ? (
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow-sm"
              >
                {typeof edu === "string" ? (
                  <p>{edu}</p>
                ) : (
                  <>
                    <p className="font-semibold">
                      {edu.degree}
                    </p>
  
                    <p>{edu.institution}</p>
  
                    <p className="text-sm text-slate-500">
                      {edu.year}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">
            No education found.
          </p>
        )}
      </div>
    )
  }
  
  export default EducationCard