import axios from "axios"

export default function CommentsApiReq(article_id) {

    return axios.get(`https://nc-news-xrc9.onrender.com/api/articles/${article_id}/comments`)
    .then(({ data }) => {
        return data
    })
}