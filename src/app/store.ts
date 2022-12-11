import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import postReducer from '../features/posts/postSlice'
import usersReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer
  }
})

// use type suffix
export type AppDispatchType = typeof store.dispatch
export type RootStateType =  ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  Action<string>
>;