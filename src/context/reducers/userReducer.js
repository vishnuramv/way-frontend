import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: '',
        token: '',
        username: '',
        email: '',
        dp_url: '',
        dob: '',
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setDpUrl: (state, action) => {
            state.dp_url = action.payload
        },
        setDob: (state, action) => {
            state.dob = action.payload
        },
        setUser: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.dob = action.payload.dob
            state.dpUrl = action.payload.dp_url
            state.userId = action.payload.userId
            state.token = action.payload.token
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserId, setDob, setDpUrl, setEmail, setToken, setUsername } = userSlice.actions

export default userSlice.reducer