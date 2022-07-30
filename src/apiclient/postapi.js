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

export const getPost = async (setBlogData, id) => {
    const url = BASE_URL + "post/get-post/" + id
    await axios.get(url).then(res => {
        setBlogData(res.data)
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


export const getMyPosts = async (dispatch, setMyBlogs) => {

    const url = BASE_URL + "post/get-my-post"
    await axios.get(url, axiosConfig).then(res => {
        dispatch(setMyBlogs(res.data))
    }).catch(err => {
        console.log(err);
    })
}