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
    <div className='min-h-screen bg-gradient-to-br from-[#14001f] via-[#1f0033] to-[#0d001a] text-white p-10'>

      {/* HEADER */}
      <div className='flex justify-between items-center mb-10'>

        <div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent'>
            Admin Dashboard
          </h1>

          <p className='text-purple-200 mt-3 text-lg'>
            AI Examination Control Panel
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-6 py-3 rounded-2xl transition duration-300 shadow-lg'
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>

        <div className='bg-[#1b0b2b]/90 border border-purple-700 p-6 rounded-3xl shadow-2xl'>
          <h2 className='text-xl font-semibold text-purple-200'>
            Total Questions
          </h2>

          <p className='text-4xl mt-4 text-purple-400 font-bold'>
            Active
          </p>
        </div>

        <div className='bg-[#1b0b2b]/90 border border-green-700 p-6 rounded-3xl shadow-2xl'>
          <h2 className='text-xl font-semibold text-green-200'>
            AI Monitoring
          </h2>

          <p className='text-4xl mt-4 text-green-400 font-bold'>
            Enabled
          </p>
        </div>

        <div className='bg-[#1b0b2b]/90 border border-fuchsia-700 p-6 rounded-3xl shadow-2xl'>
          <h2 className='text-xl font-semibold text-fuchsia-200'>
            Security Status
          </h2>

          <p className='text-4xl mt-4 text-fuchsia-400 font-bold'>
            Protected
          </p>
        </div>
      </div>

      {/* ADD QUESTION */}
      <div className='bg-[#1b0b2b]/90 border border-purple-700 p-10 rounded-3xl shadow-2xl'>

        <h2 className='text-4xl font-bold mb-8 text-purple-300'>
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
          className='bg-[#2a1240] border border-purple-600 text-white p-4 w-full rounded-2xl mb-5 outline-none focus:ring-2 focus:ring-fuchsia-500'
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
              className='bg-[#2a1240] border border-purple-600 text-white p-4 w-full rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-fuchsia-500'
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
          className='bg-[#2a1240] border border-purple-600 text-white p-4 w-full rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-fuchsia-500'
        />

        <button
          onClick={addQuestion}
          className='bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-800 hover:to-fuchsia-800 text-white px-8 py-4 rounded-2xl transition duration-300 shadow-lg font-semibold'
        >
          Add Question
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard