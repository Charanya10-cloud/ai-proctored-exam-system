import { useState } from 'react'
import { loginUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
  const [email, setEmail] =
    useState('')

  const [password,
    setPassword] =
    useState('')

  const navigate =
    useNavigate()

  const handleLogin =
    async () => {
      try {
        const data =
          await loginUser({
            email,
            password,
          })

        if (
          data.role !==
          'student'
        ) {
          alert(
            'Not a student account'
          )

          return
        }

        localStorage.setItem(
          'token',
          data.token
        )

        localStorage.setItem(
          'role',
          data.role
        )

        localStorage.setItem(
          'name',
          data.name
        )

        navigate('/exam')
      } catch (error) {
        alert(
          error.response.data.message
        )
      }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#14001f] via-[#1f0033] to-[#0d001a] flex justify-center items-center px-6'>

      <div className='bg-[#1b0b2b]/90 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl w-[400px]'>

        {/* ICON */}
        <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-purple-700 flex items-center justify-center text-4xl shadow-lg'>
          🎓
        </div>

        {/* TITLE */}
        <h1 className='text-4xl font-bold mb-3 text-center text-white'>
          Student Login
        </h1>

        <p className='text-center text-purple-200 mb-8'>
          Access your AI Proctored Examination
        </p>

        {/* EMAIL */}
        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={e =>
            setEmail(
              e.target.value
            )
          }
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

        {/* PASSWORD */}
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={e =>
            setPassword(
              e.target.value
            )
          }
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className='bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-800 hover:to-fuchsia-800 text-white w-full py-4 rounded-2xl font-semibold shadow-lg transition duration-300'
        >
          Login
        </button>

      </div>
    </div>
  )
}

export default StudentLogin