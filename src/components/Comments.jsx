import { useEffect, useState } from "react"
import CommentsApiReq from "./CommentsApiReq"
import CommentsList from "./CommentsList"


export default function Comments({ article_id }) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        CommentsApiReq(article_id)
        .then((data) => {
            const { comments } = data
            setComments(comments)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }, [article_id])

    if (isLoading) return <p className="intermediary"> ... loading comments </p>

    if (errMsg) return <p className="intermediary"> ERROR: {errMsg} </p>

    return (
        <div>
            <CommentsList comments={ comments } />
        </div>
    ) 
}