import React from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { useAppDispatch } from '../../app/hooks'

import { type Post, postAdded } from './postsSlice'

// TS types for the input fields
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
    const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

     // Create the post object and dispatch the `postAdded` action
    const newPost: Post = {
      id: nanoid(),
      title,
      content
    }
    dispatch(postAdded(newPost))

    e.currentTarget.reset()
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="postTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="postContent"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="self-start bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md transition-colors"
        >
          Save Post
        </button>
      </form>
    </section>
  )
}
