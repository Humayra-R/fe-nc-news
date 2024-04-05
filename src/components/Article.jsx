import { useEffect, useState } from "react";
import ArticlesApiRequest from "./api-request/ArticlesApiRequest";
import ArticleList from "./ArticleList";
import Comments from "./Comments";

export default function Article({ article_id, username }) {
    const [ article, setArticle ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)
    const [ commentCount, setCommentCount ] = useState(0)

useEffect(() => {
    setIsLoading(true)
    ArticlesApiRequest(`/${article_id}`)
    .then(({ article }) => {
        const [ data ] = article
        setCommentCount(data.comment_count)
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
        <Comments article_id={article_id} username={username} commentCount={commentCount} />
    </div>
    )
}