import { useEffect, useState } from "react"
import ApiRequest from "./ApiRequest"
import ArticlesList from "./ArticlesList"

export default function ArticlesData({ article_id } = null) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    useEffect(() => {
        let url = `/articles`

        if (article_id) {
            url += `/${article_id}`
        }
        setIsLoading(true)

        ApiRequest(url)
        .then((data) => {
            const { article } = data
            const { articles } = data
            
            if (article) setArticles(article)
            else setArticles(articles)
            
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
            const { msg } = err.response.data
            console.log(msg)
            setErrMsg(msg)
        })
    }, [null, article_id])

    if (isLoading) {
        return <p className="intermediary"> ... loading article  </p>
    }

    if (errMsg) {
        return <p className="intermediary"> {errMsg} </p>
    }
    
    return (
        <ArticlesList articles={ articles } article_id={ article_id } />
    )
}