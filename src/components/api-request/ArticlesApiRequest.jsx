import axios from "axios"

export default function ArticlesApiRequest(endpoint = null) {
    const articlesApi = axios.create({
        baseURL: 'https://nc-news-xrc9.onrender.com/api/articles'
    })
    return articlesApi.get(endpoint)
    .then(({ data }) => {
        return data
    })
}

