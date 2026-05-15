import {
  useNavigate,
} from 'react-router-dom'

function StudentDashboard() {
  const navigate =
    useNavigate()

  const startExam =
    async () => {
      try {
        if (
          document.documentElement
            .requestFullscreen
        ) {
          await document.documentElement.requestFullscreen()
        }

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
    <div className='min-h-screen bg-gradient-to-br from-[#12061f] via-[#1f1147] to-[#090114] text-white p-10'>

      {/* HEADER */}
      <div className='flex justify-between items-center mb-12'>

        <div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
            Student Dashboard
          </h1>

          <p className='text-purple-200 mt-3 text-xl'>
            AI Proctored Examination Portal
          </p>
        </div>

        <button
          onClick={logout}
          className='bg-gradient-to-r from-pink-600 to-purple-700 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-900/40'
        >
          Logout
        </button>
      </div>

      {/* INFO CARDS */}
      <div className='grid md:grid-cols-3 gap-6 mb-12'>

        <div className='bg-white/10 backdrop-blur-lg border border-purple-500/20 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300'>
          <h2 className='text-2xl font-bold mb-3 text-purple-100'>
            Exam Status
          </h2>

          <p className='text-green-400 text-xl font-semibold'>
            Ready
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-lg border border-purple-500/20 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300'>
          <h2 className='text-2xl font-bold mb-3 text-purple-100'>
            AI Monitoring
          </h2>

          <p className='text-cyan-300 text-xl font-semibold'>
            Enabled
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-lg border border-purple-500/20 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300'>
          <h2 className='text-2xl font-bold mb-3 text-purple-100'>
            Security
          </h2>

          <p className='text-pink-300 text-xl font-semibold'>
            Strict Mode
          </p>
        </div>

      </div>

      {/* START EXAM SECTION */}
      <div className='bg-white/10 backdrop-blur-xl border border-purple-500/20 p-16 rounded-3xl shadow-2xl text-center'>

        <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
          Start Examination
        </h1>

        <p className='text-xl text-purple-200 mb-10'>
          Webcam and fullscreen access required
        </p>

        <button
          onClick={startExam}
          className='bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-12 py-5 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-purple-900/50'
        >
          Start Exam
        </button>

      </div>
    </div>
  )
}

export default StudentDashboard