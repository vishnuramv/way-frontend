import axios from 'axios'
import { BASE_URL } from '../config'

export const Login = async (data, dispatch, setUser) => {
    const url = BASE_URL + "user/login"
    await axios.post(url, data).then(res => {
        console.log(res);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("dpUrl", res.data.dp_url);
        dispatch(setUser(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const Signup = async (data, dispatch, setUser) => {
    const url = BASE_URL + "user/signup"
    await axios.post(url, data).then(res => {
        console.log(res);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("dpUrl", res.data.dpUrl);
        localStorage.setItem("userId", res.data.userId);
        dispatch(setUser(res.data))
    }).catch(err => {
        console.log(err);
    })
}

export const getUser = async (username, dispatch, setUser) => {
    const url = BASE_URL + "user/" + username
    await axios.get(url).then(res => {
        console.log(res);
        dispatch(setUser(res.data))
    }).catch(err => {
        console.log(err);
    })
}