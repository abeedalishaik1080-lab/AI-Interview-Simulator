import { useCallback, useRef, useState } from 'react'
import { uploadResume, validateResumeFile } from '../services/uploadService'
import CandidateProfile from '../components/CandidateProfile'


const MAX_FILE_SIZE_MB = 5

function UploadResume() {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [resumeData, setResumeData] = useState(null)


  
  const resetMessages = () => {
  setSuccessMessage('')
  setErrorMessage('')
  setResumeData(null)
}

  const handleFileSelect = useCallback((file) => {
    resetMessages()
    setProgress(0)

    const validationError = validateResumeFile(file)
    if (validationError) {
      setSelectedFile(null)
      setErrorMessage(validationError)
      return
    }

    setSelectedFile(file)
  }, [])

  const handleInputChange = (event) => {
    const file = event.target.files?.[0]
    if (file) handleFileSelect(file)
    event.target.value = ''
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!selectedFile || isUploading) return

    resetMessages()
    setProgress(0)
    setIsUploading(true)

    try {
      const response = await uploadResume(selectedFile, setProgress)
    
      console.log(response)
    
      setResumeData(response.resume)
    
      setSuccessMessage('Resume uploaded successfully.')
      setSelectedFile(null)
      setProgress(0)
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.message ||
        'Upload failed. Please try again.'
      setErrorMessage(typeof message === 'string' ? message : 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">

          <div className="mb-5 text-6xl">
            📄
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Upload Resume
          </h1>

          <p className="mt-3 text-slate-400">
            Upload your PDF resume to begin your AI interview preparation.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

          <div
          
            role="button"
            tabIndex={0}
            onClick={handleBrowseClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') handleBrowseClick()
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 transition-colors ${
              isDragging
              ? 'border-indigo-500 bg-slate-800'
              : 'border-slate-700 bg-slate-800 hover:border-indigo-500 hover:bg-slate-700'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </div>

            <p className="text-lg font-medium text-white">
              Drag and drop your resume here
            </p>
            <p className="mt-1 text-sm text-slate-400">or click to browse</p>
            <p className="mt-4 text-xs text-slate-500">
              PDF only · Max {MAX_FILE_SIZE_MB} MB
            </p>
          </div>

          {selectedFile && (
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate text-sm font-medium text-white">
                {selectedFile.name}
              </span>
              <span className="ml-auto shrink-0 text-xs text-slate-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          )}

          {(isUploading || progress > 0) && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-300">Uploading...</span>
                <span className="font-medium text-indigo-600">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mt-6 rounded-lg border border-green-500/30 bg-green-900/20 px-4 py-3 text-sm text-green-300">
              {successMessage}
          </div>
          )}
          {resumeData && (
            <>
              <CandidateProfile resumeData={resumeData} />

              
            </>
          )}
          {errorMessage && (
            <div className="mt-6 rounded-lg border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}


        {!resumeData && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        )}
        </div>
      </div>
    </div>
  )
}

export default UploadResume
