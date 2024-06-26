import { useState } from "react"
import axios from 'axios'
import CommentsApiReq from "./api-request/CommentsApiReq"
import TextField from '@mui/material/TextField'


export default function PostComment({ article_id, username, addComment, removeComment, setComments, commentCount }) {
    const [ input, setInput ] = useState('')
    const [ isPosting, setIsPosting ] = useState(false)
    const [ errMsg, setErrMsg ] = useState(null)

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsPosting(true)

        const newComment = {
            article_id: Number(article_id),
            author: username,
            body: input,
            comment_id: null,
            created_at: 'date',
            votes: 0
        }
        addComment(newComment)
        setInput('')
        axios.post(`https://nc-news-xrc9.onrender.com/api/articles/${article_id}/comments`, {user_name: username, body: input})
        .then(() => {
            setErrMsg(null)

            CommentsApiReq(article_id)
            .then((data) => {
                setIsPosting(false)
                const { comments } = data
                setComments(comments)
            })
            .catch((err) => {
                const { msg } = err.response.data
                setErrMsg(msg)
            })
            
        })
        .catch((err) => {
            setIsPosting(false)
            removeComment()
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }

    return (
        <section className="comment-form">
            <form onSubmit={handleSubmit} >
                <div>
                  <label htmlFor="write-comment"> 
                  <h2 className="comment-header" > {commentCount} Comments  </h2> 
                  </label>  
                </div>
                <div className="text-field">
                    <TextField fullWidth value={input} onChange={handleChange} id="write-comment" placeholder="type comment" className="form-style" />
                </div>
                <div className="post-button">
                    <button aria-label="button for publishing comment"> Post </button>
                </div>
            </form>
            {isPosting ? <p> posting... </p> : null}
            {errMsg ? <p> ERROR: {errMsg} </p> : null}
        </section>
    )
}