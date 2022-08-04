import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:5000/'

export const getSuggestions = async (setSuggestions, queryText) => {
    await axios.post(BASE_URL, { "text": queryText }).then(res => {
        console.log(res.data)
        setSuggestions(res.data.data)
    }).catch(err => console.log(err))
}

export const getSummary = async (setSummary, queryText) => {
    const url = BASE_URL + "summarize"
    await axios.post(url, { "text": queryText }).then(res => {
        console.log(res.data)
        setSummary(res.data.data)
    }).catch(err => console.log(err))
}