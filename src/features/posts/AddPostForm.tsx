import { selectAllUsers } from '../../features/users/usersSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { postAdded } from './postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = elements.postAuthor.value

    dispatch(postAdded(title, content, userId))
    e.currentTarget.reset()
  }

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Post Title */}
        <div>
          <label htmlFor="postTitle" className="block mb-2 font-semibold text-gray-700">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            defaultValue=""
            required
            className="block w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Post Author */}
        <div>
          <label htmlFor="postAuthor" className="block mb-2 font-semibold text-gray-700">
            Author:
          </label>
          <select
            id="postAuthor"
            name="postAuthor"
            required
            className="block w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            <option value=""></option>
            {usersOptions}
          </select>
        </div>

        {/* Post Content */}
        <div>
          <label htmlFor="postContent" className="block mb-2 font-semibold text-gray-700">
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            defaultValue=""
            required
            className="block w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
