import { useEffect, useState } from "react"
import axios from 'axios'
import CommentsApiReq from "./api-request/CommentsApiReq"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments, faCalendar, faLightbulb, faAt } from '@fortawesome/free-solid-svg-icons'


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
        <div className="comments-list">
        <ul>
        {
            comments.map((comment) => {
                const formatDate = new Date(comment.created_at) 
                const date = formatDate.toLocaleDateString()

                return (
                <div key={comment.comment_id} >
                    <li  className="comment-card">
                        <div className="comment-top">
                            <div >
                            <FontAwesomeIcon icon={faAt} /> {comment.author}
                            </div>
                            <div >
                            <FontAwesomeIcon icon={faCalendar} /> {date}
                            </div>
                        </div>
                        <div >
                        <div className="comm-body" >
                            {comment.body}
                        </div>
                        <FontAwesomeIcon icon={faThumbsUp} /> {comment.votes}
                        </div>
                    </li>
                    {username === comment.author && comment.comment_id !== null ? <div className="delete-button" > <button onClick={() => handleClick(comment.comment_id)} disabled={isDeleting} aria-label='button for deleting a comment'> Delete </button> </div> : null} 
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