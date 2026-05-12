import {
  useNavigate,
} from 'react-router-dom'

function Home() {
  const navigate =
    useNavigate()

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <div className='grid md:grid-cols-2 gap-10'>

        {/* STUDENT */}
        <div className='bg-white p-10 rounded-2xl shadow-xl w-[350px] text-center'>
          <h1 className='text-3xl font-bold mb-5'>
            Student Portal
          </h1>

          <p className='text-gray-600 mb-8'>
            Attend AI monitored examinations
          </p>

          <button
            onClick={() =>
              navigate(
                '/student-login'
              )
            }
            className='bg-black text-white px-6 py-3 rounded-xl w-full'
          >
            Student Login
          </button>
        </div>

        {/* ADMIN */}
        <div className='bg-white p-10 rounded-2xl shadow-xl w-[350px] text-center'>
          <h1 className='text-3xl font-bold mb-5'>
            Admin Portal
          </h1>

          <p className='text-gray-600 mb-8'>
            Manage exams and questions
          </p>

          <button
            onClick={() =>
              navigate(
                '/admin-login'
              )
            }
            className='bg-red-500 text-white px-6 py-3 rounded-xl w-full'
          >
            Admin Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home