import { useEffect, useState } from "react"
import CommentsApiReq from "./api-request/CommentsApiReq"
import PostComment from "./PostComment"
import CommentsList from "./CommentsList"


export default function Comments({ article_id, username, commentCount }) {
    const [ comments, setComments ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)

    const addComment = (comment) => {
        setComments((currentComments) => {
        return (
            [comment, ...currentComments ]
            )
        })
    }

    const removeComment = () => {
        setComments((currentComments) => {
            let commentUpdate = [ ...currentComments]
            commentUpdate.shift()
            return commentUpdate
        })
    }

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

    if (isLoading) return <p className="intermediary"> Loading comments... </p>

    if (errMsg) return <p className="intermediary"> ERROR: {errMsg} </p>

    return (
        <div>
            <PostComment article_id={article_id} username={username} addComment={addComment} removeComment={removeComment} setComments={setComments} commentCount={commentCount} />
            <CommentsList comments={comments} username={username} article_id={article_id} setComments={setComments} />
        </div>
    ) 
}