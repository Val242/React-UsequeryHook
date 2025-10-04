import { useAppSelector } from '../../app/hooks'

export const PostsList = () => {
  const posts = useAppSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <article
      key={post.id}
      className="p-1 border border-gray-400 rounded-lg mt-2"
    >
      <h3 className="text-xl font-semibold m-0">{post.title}</h3>
      <p className="mt-2 text-base text-gray-700">
        {post.content.substring(0, 100)}
      </p>
    </article>
  ))

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {renderedPosts}
    </section>
  )
}
