import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAllUsers } from '../../features/users/usersSlice'

import { userLoggedIn } from './authSlice'

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}
interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault()

    const username = e.currentTarget.elements.username.value
    dispatch(userLoggedIn(username))
    navigate('/posts')
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
      Welcome to Tweeter!
    </h2>
    <h3 className="text-xl text-gray-600 mb-6 text-center">
      Please log in:
    </h3>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* User Select */}
      <div>
        <label
          htmlFor="username"
          className="block mb-2 font-semibold text-gray-700 text-lg"
        >
          User:
        </label>
        <select
          id="username"
          name="username"
          required
          className="block w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
        >
          <option value=""></option>
          {usersOptions}
        </select>
      </div>

      {/* Log In Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg text-lg transition-colors"
      >
        Log In
      </button>
    </form>
  </div>
</section>

  )
}