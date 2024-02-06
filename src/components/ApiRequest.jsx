import axios from "axios"

export default function ApiRequest(endpoint) {
    const articlesApi = axios.create({
        baseURL: 'https://nc-news-xrc9.onrender.com/api'
    })
    return articlesApi.get(endpoint)
    .then(({ data }) => {
        return data
    })
}

