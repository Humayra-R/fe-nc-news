import { useState } from "react"
import axios from 'axios'
import CommentsApiReq from "./api-request/CommentsApiReq"

export default function CommentsList({ comments, username, article_id, setComments }) {
    const [ isDeleting, setIsDeleting ] = useState(false)
    const [ isDeleted, setIsDeleted ] = useState(null)
    const [ errMsg, setErrMsg ] = useState(null)
    const [ commentId, setCommentId ] = useState(null)

    const handleClick = (commentId) => {
        setIsDeleting(true)
        setCommentId(commentId)
        axios.delete(`https://nc-news-xrc9.onrender.com/api/comments/${commentId}`)
        .then(() => {
            setIsDeleting(false)
            
            CommentsApiReq(article_id)
            .then((data) => {
                setIsDeleted(true)
                const { comments } = data
                
                setComments(comments)
            })
            .catch((err) => {
                const { msg } = err.response.data
                setErrMsg(msg)
            })
        })
        .catch((err) => {
            setIsDeleting(false)
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }


    return (
        <div>
        <h2> Comments: </h2>
        <ul>
        {
            comments.map((comment) => {
                return (
                <div key={comment.comment_id} >
                    <li  >
                        <div>
                            user: {comment.author}
                        </div>
                        <div>
                            {comment.body}
                        </div>
                        <div>
                            comment id: {comment.comment_id}
                        </div>
                        <div>
                            {comment.created_at}
                        </div>
                        <div>
                            votes: {comment.votes}
                        </div>
                    </li>
                    {username === comment.author && comment.comment_id !== null ? <button onClick={() => handleClick(comment.comment_id)} disabled={isDeleting} aria-label='button for deleting a comment' > Delete </button> : null} 
                    {commentId === comment.comment_id && isDeleting === true ? <p> deleting comment </p> : null}
                    {commentId === comment.comment_id && isDeleted ? <p> comment deleted! </p> : null}
                    {commentId === comment.comment_id && errMsg ? <p> {errMsg} </p> : null}
                </div>
                )
            })
        }
    </ul>
    </div>
    )
    
}