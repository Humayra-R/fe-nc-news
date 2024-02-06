import { useEffect, useState } from "react"
import ArticlesList from "./ArticlesList"
import ApiRequest from "./ApiRequest"

export default function ArticlesDataHolder() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        ApiRequest('/articles')
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
        })
    }, [])

    if (isLoading) {
        return <p className="intermediary"> ...loading articles </p>
    }

    if (isError) {
        return <p className="intermediary"> Something went wrong </p>
    }
    
    return (
        <ArticlesList articles={ articles } />
    )
}