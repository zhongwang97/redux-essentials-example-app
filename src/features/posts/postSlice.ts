import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { RootStateType } from "../../app/store";

export interface Post {
    id: string;
    title: string;
    content: string;
    user: string
    date: string
}

export interface Param {
    postId: string
}

const initialState: Post[] = [
    {
        id: '1', 
        title: 'First Post!', 
        content: 'Hello!', 
        user: "",
        date: sub(new Date(), { minutes: 10 }).toISOString() },
    { 
        id: '2', 
        title: 'Second Post', 
        content: 'More text', 
        user: "",
        date: sub(new Date(), { minutes: 5 }).toISOString() 
    }
]

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId) => {
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
        postUpdated: (state, action: PayloadAction<Post>) => {
            const {id, title, content} = action.payload
            const existingPost = state.find(p => p.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const selectPostFunc = (state: RootStateType) => state.posts

export default postSlice.reducer
export const { postAdded, postUpdated } = postSlice.actions
