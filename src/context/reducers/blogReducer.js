import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogFeed: [],
        savedBlogs: [],
        myBlogs: [],
    },
    reducers: {
        setBlogFeed: (state, action) => {
            state.blogFeed = action.payload
        },
        setSavedBlogs: (state, action) => {
            state.savedBlogs = action.payload
        },
        setMyBlogs: (state, action) => {
            state.myBlogs = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setBlogFeed, setSavedBlogs, setMyBlogs } = blogSlice.actions

export default blogSlice.reducer