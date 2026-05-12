import {
  useNavigate,
} from 'react-router-dom'

function StudentDashboard() {
  const navigate =
    useNavigate()

  const startExam =
    async () => {
      try {
        // Fullscreen ONLY from button click
        if (
          document.documentElement
            .requestFullscreen
        ) {
          await document.documentElement.requestFullscreen()
        }

        // Navigate AFTER fullscreen
        navigate('/exam')
      } catch (error) {
        console.log(error)
      }
    }

  const logout = () => {
    localStorage.clear()

    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gray-100 p-10'>

      {/* HEADER */}
      <div className='flex justify-between items-center mb-10'>

        <div>
          <h1 className='text-5xl font-bold'>
            Student Dashboard
          </h1>

          <p className='text-gray-600 mt-2 text-xl'>
            AI Proctored Examination Portal
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-red-500 text-white px-6 py-3 rounded-2xl'
        >
          Logout
        </button>
      </div>

      {/* INFO CARDS */}
      <div className='grid md:grid-cols-3 gap-6 mb-10'>

        <div className='bg-white p-8 rounded-3xl shadow-lg'>
          <h2 className='text-2xl font-bold mb-3'>
            Exam Status
          </h2>

          <p className='text-green-500 text-xl font-semibold'>
            Ready
          </p>
        </div>

        <div className='bg-white p-8 rounded-3xl shadow-lg'>
          <h2 className='text-2xl font-bold mb-3'>
            AI Monitoring
          </h2>

          <p className='text-blue-500 text-xl font-semibold'>
            Enabled
          </p>
        </div>

        <div className='bg-white p-8 rounded-3xl shadow-lg'>
          <h2 className='text-2xl font-bold mb-3'>
            Security
          </h2>

          <p className='text-red-500 text-xl font-semibold'>
            Strict Mode
          </p>
        </div>

      </div>

      {/* START EXAM */}
      <div className='bg-white p-16 rounded-3xl shadow-lg text-center'>

        <h1 className='text-5xl font-bold mb-6'>
          Start Examination
        </h1>

        <p className='text-xl text-gray-600 mb-10'>
          Webcam and fullscreen access required
        </p>

        <button
          onClick={startExam}
          className='bg-black text-white px-12 py-5 rounded-2xl text-2xl'
        >
          Start Exam
        </button>

      </div>
    </div>
  )
}

export default StudentDashboard