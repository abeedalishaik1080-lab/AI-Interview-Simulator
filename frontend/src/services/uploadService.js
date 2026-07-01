import api from './api'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export function validateResumeFile(file) {
  if (!file) {
    return 'Please select a file.'
  }

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return 'Only PDF files are allowed.'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds the 5 MB limit.'
  }

  return null
}

export async function uploadResume(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': undefined },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total))
      }
    },
  })

  return response.data
}
export async function generateInterview() {
  const response = await api.post("/generate-interview")

  return response.data
}
export async function evaluateInterview(data) {
  const response = await api.post("/evaluate-interview", data)

  return response.data
}