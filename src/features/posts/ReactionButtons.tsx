import { useAppDispatch } from '../../app/hooks'
import type { Post, ReactionName } from './postsSlice'
import { reactionAdded } from './postsSlice'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

interface ReactionButtonsProps {
  post: Post
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      const reaction = stringName as ReactionName
      return (
        <button
          key={reaction}
          type="button"
          onClick={() => dispatch(reactionAdded({ postId: post.id, reaction }))}
          className="
            flex items-center gap-1 border border-gray-300 
            px-3 py-1.5 rounded-md m-1 
            text-gray-700 bg-white hover:bg-gray-100 
            transition-colors duration-150 shadow-sm
            active:scale-95
          "
        >
          <span>{emoji}</span>
          <span className="text-sm font-medium">{post.reactions[reaction]}</span>
        </button>
      )
    }
  )

  return (
    <div className="flex flex-wrap mt-2">
      {reactionButtons}
    </div>
  )
}
