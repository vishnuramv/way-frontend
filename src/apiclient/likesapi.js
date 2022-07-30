import axios from 'axios'
import { axiosConfig, BASE_URL } from '../config'



export const isBlogLiked = async (postId, setIsLiked) => {
    const url = BASE_URL + "vote-post/is-voted/"
    await axios.post(url, postId, axiosConfig).then(res => {
        // console.log(res.data)
        setIsLiked(res.data)
    }).catch(err => {
        console.log(err);
    })
}

export const likeBlog = async (postId) => {
    const url = BASE_URL + "vote-post/upvote"
    // console.log(postId)
    await axios.post(url, postId, axiosConfig).then(res => {
        // console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}

export const dislikeBlog = async (postId) => {
    const url = BASE_URL + "vote-post/delete-upvote/" + postId
    await axios.delete(url, axiosConfig).then(res => {
        // console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}