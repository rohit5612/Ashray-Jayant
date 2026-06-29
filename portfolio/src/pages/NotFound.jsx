import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm tracking-widest text-accent-cyan uppercase">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-text-muted">This project or page doesn't exist.</p>
      <Link to="/" className="mt-8 text-accent-cyan hover:underline">
        Return home
      </Link>
    </div>
  )
}
