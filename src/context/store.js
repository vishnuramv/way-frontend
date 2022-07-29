import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
    },
})