function PersonalInfo({ resumeData }) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-4 text-xl font-bold text-blue-700">
          👤 Personal Information
        </h3>
  
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-semibold">{resumeData.name}</p>
          </div>
  
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-semibold">{resumeData.email}</p>
          </div>
  
          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="font-semibold">{resumeData.phone}</p>
          </div>
        </div>
      </div>
    )
  }
  
  export default PersonalInfo