import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";

export interface Post {
    id: string;
    title: string;
    content: string;
}

export interface Param {
    postId: string
}

const initialState: Post[] = [
    {id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.push(action.payload)
            },
            prepare: (title, content) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
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
