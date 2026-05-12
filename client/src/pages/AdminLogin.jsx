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
          'admin'
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

       navigate('/admin')
      } catch (error) {
        alert(
          error.response.data.message
        )
      }
    }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='bg-white p-10 rounded-2xl shadow-xl w-[400px]'>

        <h1 className='text-3xl font-bold mb-8 text-center'>
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
          className='border p-3 w-full rounded-xl mb-4'
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
          className='border p-3 w-full rounded-xl mb-6'
        />

        <button
          onClick={handleLogin}
          className='bg-black text-white w-full py-3 rounded-xl'
        >
          Login
        </button>

      </div>
    </div>
  )
}

export default StudentLogin