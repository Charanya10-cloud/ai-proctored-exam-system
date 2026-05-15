import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/authService'

function Register() {
  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [role, setRole] =
    useState('student')

  const handleRegister =
    async () => {
      try {
        const data =
          await registerUser({
            name,
            email,
            password,
            role,
          })

        alert(data.message)
      } catch (error) {
        alert(
          error.response.data
            .message
        )
      }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#14001f] via-[#1f0033] to-[#0d001a] flex justify-center items-center px-6'>

      <div className='bg-[#1b0b2b]/90 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl w-[420px]'>

        {/* ICON */}
        <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-700 flex items-center justify-center text-4xl shadow-lg'>
          ✨
        </div>

        {/* TITLE */}
        <h1 className='text-4xl font-bold mb-3 text-center text-white'>
          Create Account
        </h1>

        <p className='text-center text-purple-200 mb-8'>
          Join the AI Proctored Examination Platform
        </p>

        {/* NAME */}
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={e =>
            setName(
              e.target.value
            )
          }
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full mb-4 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

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
          className='bg-[#2a1240] border border-purple-600 text-white placeholder-purple-300 p-4 w-full mb-4 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={e =>
            setRole(
              e.target.value
            )
          }
          className='bg-[#2a1240] border border-purple-600 text-white p-4 w-full mb-6 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-500'
        >
          <option value='student'>
            Student
          </option>

          <option value='admin'>
            Admin
          </option>
        </select>

        {/* BUTTON */}
        <button
          onClick={
            handleRegister
          }
          className='bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-800 hover:to-fuchsia-800 text-white px-4 py-4 w-full rounded-2xl font-semibold transition duration-300 shadow-lg'
        >
          Register
        </button>

        {/* LOGIN */}
        <div className='mt-6 text-center text-purple-200'>
          <p>
            Already have an account?{' '}
            <Link
              to='/'
              className='text-fuchsia-400 font-bold hover:text-fuchsia-300 transition'
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register