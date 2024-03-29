import { useEffect, useState } from "react"
import ArticlesApiRequest from "./api-request/ArticlesApiRequest"
import ArticleTopics from "./ArticleTopics"
import ArticlesList from "./ArticlesList"

export default function ArticlesData() {
    const [ articles, setArticles ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)

    useEffect(() => {
        setIsLoading(true)

        ArticlesApiRequest()
        .then(({ articles }) => {
            setArticles(articles) 
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }, [])

    if (isLoading) {
        return <p className="intermediary"> Loading articles... </p>
    }

    if (errMsg) {
        return <p className="intermediary"> ERROR: {errMsg} </p>
    }
    
    return (
        <div>
            <ArticleTopics setArticles={setArticles} />
            <ArticlesList articles={articles} />
        </div>
    )
}