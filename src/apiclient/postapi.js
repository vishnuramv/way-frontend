import axios from 'axios'
import { axiosConfig, BASE_URL } from '../config'

export const getPosts = async (dispatch, setBlogFeed) => {
    const url = BASE_URL + "post/get-post"
    await axios.get(url).then(res => {
        dispatch(setBlogFeed(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const getSavedPosts = async (dispatch, setSavedBlogs) => {
    const url = BASE_URL + "save-post/get-posts"
    await axios.get(url, axiosConfig).then(res => {
        dispatch(setSavedBlogs(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const writePost = async (post, setResponse) => {
    const url = BASE_URL + "post/"
    await axios.post(url, post, axiosConfig).then(res => {
        setResponse(res)
    }).catch(err => {
        console.log(err);
    })
}

export const isBlogLiked = async (postId, setIsLiked) => {
    const url = BASE_URL + "post/is-voted/"
    await axios.get(url, postId, axiosConfig).then(res => {
        console.log(res.data)
        setIsLiked(true)
    }).catch(err => {
        console.log(err);
    })
}

export const isBlogSaved = async (postId, setIsSaved) => {
    const url = BASE_URL + "save-post/is-saved/"
    await axios.get(url, postId, axiosConfig).then(res => {
        setIsSaved(res.data)
    }).catch(err => {
        console.log(err);
    })
}