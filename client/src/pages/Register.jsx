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
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className='border bg-white p-10 rounded-xl w-[400px] shadow-lg'>
        <h1 className='text-3xl font-bold mb-5 text-center'>
          Register
        </h1>

        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e =>
            setName(
              e.target.value
            )
          }
          className='border p-3 w-full mb-3 rounded-lg'
        />

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
          className='border p-3 w-full mb-3 rounded-lg'
        />

        <select
          value={role}
          onChange={e =>
            setRole(
              e.target.value
            )
          }
          className='border p-3 w-full mb-5 rounded-lg'
        >
          <option value='student'>
            Student
          </option>

          <option value='admin'>
            Admin
          </option>
        </select>

        <button
          onClick={
            handleRegister
          }
          className='bg-black text-white px-4 py-3 w-full rounded-lg hover:bg-gray-800'
        >
          Register
        </button>
        <div className='mt-4 text-center'>
  <p>
    Already have an account?{' '}
    <Link
      to='/'
      className='text-blue-500 font-bold'
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