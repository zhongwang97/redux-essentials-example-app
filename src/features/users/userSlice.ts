import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../../app/store";

export interface User {
    id: string
    name: string
}

const initialState: User[] = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
  ]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})

export default usersSlice.reducer

export const selectUserFunc = (state: RootStateType) => state.users