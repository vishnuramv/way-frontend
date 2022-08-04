import axios from 'axios'
import { axiosConfig, BASE_URL } from '../config'


export const addFollow = async (followeeId) => {
    const url = BASE_URL + "follow/add/" + followeeId;
    await axios.get(url, axiosConfig).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}

export const removeFollow = async (followeeId) => {
    const url = BASE_URL + "follow/" + followeeId;
    await axios.delete(url, axiosConfig).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}


export const getFollowers = async (followeeId) => {
    const url = BASE_URL + "follow/" + followeeId;
    await axios.get(url, axiosConfig).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err);
    })
}

export const getMyFollow = async (dispatch, setFollow) => {
    const url = BASE_URL + "follow/";
    await axios.get(url, axiosConfig).then(res => {
        console.log(res.data)
        dispatch(setFollow(res.data))
    }).catch(err => {
        console.log(err);
    })
}