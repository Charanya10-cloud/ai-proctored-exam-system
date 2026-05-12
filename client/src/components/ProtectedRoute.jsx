import { Navigate } from 'react-router-dom'

function ProtectedRoute({
  children,
  role,
}) {
  const token =
    localStorage.getItem(
      'token'
    )

  const userRole =
    localStorage.getItem(
      'role'
    )

  // NOT LOGGED IN
  if (!token) {
    return (
      <Navigate to='/' />
    )
  }

  // ROLE CHECK
  if (
    role &&
    userRole !== role
  ) {
    return (
      <Navigate to='/student' />
    )
  }

  return children
}

export default ProtectedRoute