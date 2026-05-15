import {
  useNavigate,
} from 'react-router-dom'

function Home() {
  const navigate =
    useNavigate()

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#14001f] via-[#1f0033] to-[#0d001a] flex justify-center items-center px-6'>

      <div className='grid md:grid-cols-2 gap-10'>

        {/* STUDENT */}
        <div className='bg-[#1b0b2b]/90 backdrop-blur-lg border border-purple-700 p-10 rounded-3xl shadow-2xl w-[350px] text-center hover:scale-105 transition duration-300'>

          <div className='w-16 h-16 mx-auto mb-5 rounded-full bg-purple-700 flex items-center justify-center text-white text-2xl'>
            🎓
          </div>

          <h1 className='text-3xl font-bold mb-4 text-white'>
            Student Portal
          </h1>

          <p className='text-purple-200 mb-8'>
            Attend AI monitored examinations
          </p>

          <button
            onClick={() =>
              navigate(
                '/student-login'
              )
            }
            className='bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-2xl w-full font-semibold transition duration-300 shadow-lg'
          >
            Student Login
          </button>
        </div>

        {/* ADMIN */}
        <div className='bg-[#1b0b2b]/90 backdrop-blur-lg border border-fuchsia-700 p-10 rounded-3xl shadow-2xl w-[350px] text-center hover:scale-105 transition duration-300'>

          <div className='w-16 h-16 mx-auto mb-5 rounded-full bg-fuchsia-700 flex items-center justify-center text-white text-2xl'>
            🛡️
          </div>

          <h1 className='text-3xl font-bold mb-4 text-white'>
            Admin Portal
          </h1>

          <p className='text-purple-200 mb-8'>
            Manage exams and questions
          </p>

          <button
            onClick={() =>
              navigate(
                '/admin-login'
              )
            }
            className='bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-6 py-3 rounded-2xl w-full font-semibold transition duration-300 shadow-lg'
          >
            Admin Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home