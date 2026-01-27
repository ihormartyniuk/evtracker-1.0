import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-base-100 border-b border-base-300 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="EVTracker" className="h-8" />
        </Link>
      </div>
    </header>
  )
}

