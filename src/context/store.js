import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import followReducer from './reducers/followReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        follow: followReducer
    },
})