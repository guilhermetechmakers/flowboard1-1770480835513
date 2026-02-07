import { Link } from 'react-router-dom'

export function PasswordResetLink() {
  return (
    <Link
      to="/password-reset"
      className="text-sm text-primary transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
    >
      Forgot password?
    </Link>
  )
}
