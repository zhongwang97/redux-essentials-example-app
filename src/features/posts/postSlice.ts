import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { client } from "../../api/client";
import { RootStateType } from "../../app/store";

export interface Post {
    id: string;
    title: string;
    content: string;
    user: string
    date: string
}

export interface PostState {
    posts: Post[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
}

export interface Param {
    postId: string
}

// const initialState: Post[] = [
//     {
//         id: '1', 
//         title: 'First Post!', 
//         content: 'Hello!', 
//         user: "",
//         date: sub(new Date(), { minutes: 10 }).toISOString() },
//     { 
//         id: '2', 
//         title: 'Second Post', 
//         content: 'More text', 
//         user: "",
//         date: sub(new Date(), { minutes: 5 }).toISOString() 
//     }
// ]

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await client.get('/fakeApi/posts')
        return response.data
    }
)

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts.push(action.payload)
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
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                //state.error = action.payload.message // FIXME 
            })
    }
})


export const selectPostFunc = (state: RootStateType) => state.posts
export const selectPostByIdFunc = (state: RootStateType, postId: string) => state.posts.posts.find(post => post.id === postId)

export default postSlice.reducer
export const { postAdded, postUpdated } = postSlice.actions
