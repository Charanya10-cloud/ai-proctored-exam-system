import axios from 'axios'

const API = 'https://ai-proctored-exam-system-backend.onrender.com/api/auth'

export const registerUser = async userData => {
  const response = await axios.post(
    `${API}/register`,
    userData
  )

  return response.data
}

export const loginUser = async userData => {
  const response = await axios.post(
    `${API}/login`,
    userData
  )

  return response.data
}