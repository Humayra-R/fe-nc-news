import { useEffect, useState } from "react";
import ArticlesApiRequest from "./api-request/ArticlesApiRequest";
import ArticleList from "./ArticleList";

export default function Article({ article_id }) {
    const [ article, setArticle ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)

useEffect(() => {
    setIsLoading(true)
    ArticlesApiRequest(`/${article_id}`)
    .then(({ article }) => {
        const [ data ] = article
        setIsLoading(false)
        setArticle(data)
    })
    .catch((err) => {
            setIsLoading(false)
            const { msg } = err.response.data
            setErrMsg(msg)
        })  
    }, [article_id])

    if (isLoading) return <p> ...loading article </p>

    if (errMsg) return <p> ERROR: {errMsg} </p>

    return (
    <div>
        <ArticleList article={article} />
    </div>
    )
}