import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'

export const SinglePostPage = () => {
  const { postId } = useParams()

  /*const post = useAppSelector(state =>
    state.posts.find(post => post.id === postId)
  ) before*/
    const post = useAppSelector(state => selectPostById(state, postId!))//after
//We can use the TS ! operator to tell the TS compiler this value will
//  not be undefined at this point in the code. 


  if (!post) {
    return (
      <section className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Post not found!</h2>
      </section>
    )
  }

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <article className="post">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h2>
        <p className="text-gray-700 mb-6">{post.content}</p>
        <Link
          to={`/editPost/${post.id}`}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Edit Post
        </Link>
      </article>
      <PostAuthor userId={post.user} />
    </section>
    
  )
}

//Once we have that postId value, we can use it inside a selector function to find the right post object from the Redux store. 
// We know that state.posts should be an array of all post objects, 
// so we can use the Array.find() function to loop through the array 
// and return the post entry with the ID we're looking for.

// Components should always try to select the smallest possible amount of data they
//  need from the store, which will help ensure that it only renders when it actually needs to.