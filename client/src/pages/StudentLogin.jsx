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

        navigate('/student')
      } catch (error) {
        alert(
          error.response.data.message
        )
      }
    }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-[#12061f] via-[#1f1147] to-[#090114] px-4'>

      <div className='bg-white/10 backdrop-blur-xl border border-purple-500/20 p-10 rounded-3xl shadow-2xl w-[400px]'>

        <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
          Student Login
        </h1>

        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e =>
            setEmail(
              e.target.value
            )
          }
          className='bg-[#1d1236] border border-purple-500/30 text-white placeholder:text-gray-400 p-4 w-full rounded-2xl mb-4 outline-none focus:border-pink-400 transition-all duration-300'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e =>
            setPassword(
              e.target.value
            )
          }
          className='bg-[#1d1236] border border-purple-500/30 text-white placeholder:text-gray-400 p-4 w-full rounded-2xl mb-6 outline-none focus:border-pink-400 transition-all duration-300'
        />

        <button
          onClick={handleLogin}
          className='bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white w-full py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-900/40'
        >
          Login
        </button>

      </div>
    </div>
  )
}

export default StudentLogin