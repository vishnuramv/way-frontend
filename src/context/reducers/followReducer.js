import { createSlice } from '@reduxjs/toolkit'

export const followSlice = createSlice({
    name: 'follow',
    initialState: {
        followers: [],
        followings: []
    },
    reducers: {
        setFollowers: (state, action) => {
            state.followers = action.payload
        },
        setFollowing: (state, action) => {
            state.followings = action.payload
        },
        setFollow: (state, action) => {
            state.followers = action.payload.followers
            state.followings = action.payload.followings
        }
    },
})

// Action creators are generated for each case reducer function
export const { setFollow, setFollowers, setFollowing } = followSlice.actions

export default followSlice.reducer