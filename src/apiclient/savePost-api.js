import axios from 'axios'
import { axiosConfig, BASE_URL } from '../config'


export const isBlogSaved = async (postId, setIsSaved) => {
    const url = BASE_URL + "save-post/is-saved"
    await axios.post(url, postId, axiosConfig).then(res => {
        setIsSaved(res.data)
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

export const saveBlog = async (postId) => {
    const url = BASE_URL + "save-post/save"
    await axios.post(url, postId, axiosConfig).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}

export const unsaveBlog = async (postId) => {
    const url = BASE_URL + "save-post/delete-post/" + postId
    await axios.delete(url, axiosConfig).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finally")
    }
    )
}