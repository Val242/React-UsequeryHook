import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { postUpdated, selectPostById } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

   /*const post = useAppSelector(state =>
     state.posts.find(post => post.id === postId)
   ) before*/
     const post = useAppSelector(state => selectPostById(state, postId!))//after
//We can use the TS ! operator to tell the TS compiler this value will
//  not be undefined at this point in the code. 

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if (!post) {
    return (
      <section className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Post not found!</h2>
      </section>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { elements } = e.currentTarget as typeof e.currentTarget & {
      elements: {
        postTitle: HTMLInputElement
        postContent: HTMLTextAreaElement
      }
    }

    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h2>

      <form onSubmit={onSavePostClicked} className="space-y-6">
        <div>
          <label
            htmlFor="postTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            defaultValue={post.title}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="postContent"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="postContent"
            name="postContent"
            defaultValue={post.content}
            required
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Save Post
        </button>
      </form>
    </section>
  )
}
