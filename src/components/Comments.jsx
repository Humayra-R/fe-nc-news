import { useEffect, useState } from "react"
import CommentsApiReq from "./CommentsApiReq"
import PostComment from "./PostComment"
import CommentsList from "./CommentsList"


export default function Comments({ article_id, username }) {
    const [ comments, setComments ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)

    const addComment = (comment) => {
        setComments((currentComments) => {
        return [comment, ...currentComments ]
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

    if (isLoading) return <p className="intermediary"> ...loading comments </p>

    if (errMsg) return <p className="intermediary"> ERROR: {errMsg} </p>

    return (
        <div>
            <PostComment article_id={article_id} username={username} addComment={addComment} removeComment={removeComment} />
            <CommentsList comments={comments} setComments={setComments} />
        </div>
    ) 
}