import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate =
    useNavigate()

  const [question,
    setQuestion] =
    useState('')

  const [options,
    setOptions] =
    useState([
      '',
      '',
      '',
      '',
    ])

  const [answer,
    setAnswer] =
    useState('')

  const logout = () => {
    localStorage.clear()

    navigate('/')
  }

  const handleOptionChange =
    (index, value) => {
      const updated =
        [...options]

      updated[index] =
        value

      setOptions(updated)
    }

  const addQuestion =
    async () => {
      try {
        await axios.post(
          'http://localhost:5000/api/questions',
          {
            question,
            options,
            answer,
          }
        )

        alert(
          'Question Added Successfully'
        )

        setQuestion('')

        setOptions([
          '',
          '',
          '',
          '',
        ])

        setAnswer('')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='min-h-screen bg-gray-100 p-10'>
      {/* HEADER */}
      <div className='flex justify-between items-center mb-10'>
        <div>
          <h1 className='text-4xl font-bold'>
            Admin Dashboard
          </h1>

          <p className='text-gray-600 mt-2'>
            AI Examination Control Panel
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600'
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-white p-6 rounded-2xl shadow-lg'>
          <h2 className='text-xl font-bold'>
            Total Questions
          </h2>

          <p className='text-3xl mt-3 text-blue-600 font-bold'>
            Active
          </p>
        </div>

        <div className='bg-white p-6 rounded-2xl shadow-lg'>
          <h2 className='text-xl font-bold'>
            AI Monitoring
          </h2>

          <p className='text-3xl mt-3 text-green-600 font-bold'>
            Enabled
          </p>
        </div>

        <div className='bg-white p-6 rounded-2xl shadow-lg'>
          <h2 className='text-xl font-bold'>
            Security Status
          </h2>

          <p className='text-3xl mt-3 text-red-500 font-bold'>
            Protected
          </p>
        </div>
      </div>

      {/* ADD QUESTION */}
      <div className='bg-white p-10 rounded-2xl shadow-lg'>
        <h2 className='text-3xl font-bold mb-8'>
          Add New Question
        </h2>

        <input
          type='text'
          placeholder='Enter Question'
          value={question}
          onChange={e =>
            setQuestion(
              e.target.value
            )
          }
          className='border p-3 w-full rounded-xl mb-5'
        />

        {options.map(
          (
            option,
            index
          ) => (
            <input
              key={index}
              type='text'
              placeholder={`Option ${
                index + 1
              }`}
              value={option}
              onChange={e =>
                handleOptionChange(
                  index,
                  e.target.value
                )
              }
              className='border p-3 w-full rounded-xl mb-4'
            />
          )
        )}

        <input
          type='text'
          placeholder='Correct Answer'
          value={answer}
          onChange={e =>
            setAnswer(
              e.target.value
            )
          }
          className='border p-3 w-full rounded-xl mb-5'
        />

        <button
          onClick={addQuestion}
          className='bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800'
        >
          Add Question
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard