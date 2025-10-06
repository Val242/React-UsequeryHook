import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { userLoggedOut } from '.././features/auth/authSlice'
import { selectCurrentUser } from '.././features/users/usersSlice'
import { User } from 'lucide-react'


export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isLoggedIn = !!user

  const onLogoutClicked = () => {
    dispatch(userLoggedOut())
  }

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <section className="container mx-auto flex items-center justify-between p-4">
        <Link to="/posts" className="text-2xl font-semibold text-white">
          Redux Essentials
        </Link>

        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <Link
              to="/posts"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Posts
            </Link>

            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
              <User size={32} color="blue" />
              <span className="font-medium">{user.name}</span>
            </div>

            <button
              onClick={onLogoutClicked}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium transition"
            >
              Log Out
            </button>
          </div>
        )}
      </section>
    </nav>
  )
}
