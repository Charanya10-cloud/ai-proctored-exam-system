import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { loginUser } from '../services/authService'

function Login() {
  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleLogin =
    async () => {
      try {
        const data =
          await loginUser({
            email,
            password,
          })

        alert(
          'Login Successful'
        )

        console.log(data)

        // SAVE USER DATA
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
          data.user.name
        )

        localStorage.setItem(
          'email',
          data.user.email
        )

        // ROLE BASED ROUTING
        if (
          data.role ===
          'admin'
        ) {
          navigate('/admin')
        } else {
          navigate('/student')
        }
      } catch (error) {
        console.log(error)

        alert(
          error.response?.data
            ?.message ||
            'Login Failed'
        )
      }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#14001f] via-[#1f0033] to-[#0d001a] flex justify-center items-center px-6'>

      <div className='bg-[#1b0b2b]/90 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl w-[400px]'>

        {/* ICON */}
        <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-700 flex items-center justify-center text-4xl shadow-lg'>
          🔐
        </div>

        {/* TITLE */}
        <h1 className='text-4xl font-bold mb-3 text-center text-white'>
          Welcome Back
        </h1>

        <p className='text-center text-purple-200 mb-8'>
          Login to continue your AI Proctored Exam System
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
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full mb-4 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-500'
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
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full mb-6 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className='bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-800 hover:to-fuchsia-800 text-white px-4 py-4 w-full rounded-2xl font-semibold transition duration-300 shadow-lg'
        >
          Login
        </button>

        {/* REGISTER */}
        <div className='mt-6 text-center text-purple-200'>
          <p>
            Don’t have an account?{' '}
            <Link
              to='/register'
              className='text-fuchsia-400 font-bold hover:text-fuchsia-300 transition'
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login