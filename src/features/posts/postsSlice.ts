import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import type { RootState } from '@/app/store'
import { sub } from 'date-fns'

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}



type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
//Pick<T, K> is a TypeScript utility type.
//It creates a new type with only the selected keys from T.

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}


// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  {
     id: '1', 
     title: 'First Post!',
     content: 'Hello!',
     user: '0',
     date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: { ...initialReactions }
    
   },
  { id: '2', 
    title: 'Second Post', 
    content: 'More text', 
    user: '2',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { ...initialReactions }
  }
  
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,//The state value that this slice manages.
  reducers: {//Use past tense when naming reducers
       postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string,  userId: string,  ) {
        return {
          payload: { 
            id: nanoid(),
            date: new Date().toISOString(),
            title, 
            content,
            user: userId
            
            }
        }
      }
    },
      postUpdated(state, action: PayloadAction<PostUpdate>)  {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
       reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionName }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

// Export the auto-generated action creator with the same name
export const { postAdded,postUpdated, reactionAdded } = postsSlice.actions
export const selectAllPosts = (state: RootState) => state.posts

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find(post => post.id === postId)
// Export the generated reducer function
export default postsSlice.reducer

//To update an item form the store we need to know its ID and also 
//access its new credentials to effectively perform the update