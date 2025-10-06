import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { selectCurrentUsername } from '../../features/auth/authSlice'

import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from '../../components/TimeAgo'

export const SinglePostPage = () => {
  const { postId } = useParams()

  /*const post = useAppSelector(state =>
    state.posts.find(post => post.id === postId)
  ) before*/
    const post = useAppSelector(state => selectPostById(state, postId!))
    const currentUsername = useAppSelector(selectCurrentUsername)!//after
//We can use the TS ! operator to tell the TS compiler this value will
//  not be undefined at this point in the code. 


  if (!post) {
    return (
      <section className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Post not found!</h2>
      </section>
    )
  }
   const canEdit = currentUsername === post.user

  return (
    <section className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
  <article className="post space-y-4">
    {/* Post Title */}
    <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>

    {/* Author and Timestamp */}
    <div className="flex items-center gap-4 text-gray-500 text-sm">
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </div>

    {/* Post Content */}
    <p className="post-content text-gray-700">{post.content}</p>

    {/* Reactions */}
    <div>
      <ReactionButtons post={post} />
    </div>

    {/* Edit Button */}
    {canEdit && (
      <Link
        to={`/editPost/${post.id}`}
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Edit Post
      </Link>
    )}
  </article>
</section>

  )
}

//Once we have that postId value, we can use it inside a selector function to find the right post object from the Redux store. 
// We know that state.posts should be an array of all post objects, 
// so we can use the Array.find() function to loop through the array 
// and return the post entry with the ID we're looking for.

// Components should always try to select the smallest possible amount of data they
//  need from the store, which will help ensure that it only renders when it actually needs to.