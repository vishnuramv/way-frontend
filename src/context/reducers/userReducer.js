import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        token: localStorage.getItem('token') || '',
        username: '',
        email: '',
        dpUrl: '',
        dob: '',
        name: '',
        followers: 0,
        followings: 0
    },
    reducers: {
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
            state.dpUrl = action.payload
        },
        setDob: (state, action) => {
            state.dob = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setFollowers: (state, action) => {
            state.followers = action.payload
        },
        setFollowings: (state, action) => {
            state.followings = action.payload
        },
        setUser: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.dob = action.payload.dob
            state.dpUrl = action.payload.dpUrl
            state.name = action.payload.name
            state.followers = action.payload.followers
            state.followings = action.payload.following
            state.id = action.payload.id
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserId, setDob, setDpUrl, setEmail, setToken, setUsername } = userSlice.actions

export default userSlice.reducer