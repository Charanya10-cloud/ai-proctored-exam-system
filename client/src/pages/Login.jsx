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
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='border bg-white p-10 rounded-xl w-[400px] shadow-lg'>
        
        <h1 className='text-3xl font-bold mb-5 text-center'>
          Login
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
          className='border p-3 w-full mb-3 rounded-lg'
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
          className='border p-3 w-full mb-5 rounded-lg'
        />

        <button
          onClick={handleLogin}
          className='bg-black text-white px-4 py-3 w-full rounded-lg hover:bg-gray-800'
        >
          Login
        </button>

        <div className='mt-4 text-center'>
          <p>
            Don’t have an account?{' '}
            <Link
              to='/register'
              className='text-blue-500 font-bold'
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