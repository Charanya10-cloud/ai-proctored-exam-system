import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import StudentLogin from './pages/StudentLogin'
import AdminLogin from './pages/AdminLogin'
import Login from './pages/Login'
import Register from './pages/Register'
import Exam from './pages/Exam'
import StudentDashboard from './pages/StudentDashboard'

import AdminDashboard from './pages/AdminDashboard'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Login />}
      />

      <Route
        path='/register'
        element={<Register />}
      />
      <Route
  path='/student'
  element={<StudentDashboard />}
/>
<Route
  path='/'
  element={<Home />}
/>

<Route
  path='/student-login'
  element={<StudentLogin />}
/>

<Route
  path='/admin-login'
  element={<AdminLogin />}
/>
<Route
  path='/admin'
  element={
    <ProtectedRoute role='admin'>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
      <Route
        path='/exam'
        element={
          <ProtectedRoute>
            <Exam />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App