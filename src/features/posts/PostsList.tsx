import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAllPosts } from './postsSlice'
import { PostAuthor } from './PostAuthor'

export const PostsList = () => {
  //const posts = useAppSelector(state => state.posts) before
    const posts = useAppSelector(selectAllPosts)//after

  const renderedPosts = posts.map(post => (
    <article
      key={post.id}
      className="p-1 border border-gray-400 rounded-lg mt-2"
    >
      <h3 className="text-xl font-semibold m-0">
           <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
      <p className="mt-2 text-base text-gray-700">
        {post.content.substring(0, 100)}

      </p>
        <PostAuthor userId={post.user} />
    </article>
  ))

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {renderedPosts}
    
    </section>
  )
}
