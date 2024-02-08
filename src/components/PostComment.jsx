import { useState } from "react"
import axios from 'axios'

export default function PostComment({ article_id, username, addComment, removeComment }) {
    const [ input, setInput ] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

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

        axios.post(`https://nc-news-xrc9.onrender.com/api/articles/${article_id}/comments`, {user_name: username, body: input})
        .then(() => {
            setIsPosting(false)
            setErrMsg(null)
        })
        .catch((err) => {
            setIsPosting(false)
            removeComment()
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="comment-form">
                <label htmlFor="write-comment"> Leave a comment: </label>
                <input value={input} onChange={handleChange} id="write-comment" placeholder="type comment"/>
                <button aria-label="button for publishing comment"> post </button>
            </form>
            {isPosting ? <p> posting... </p> : null}
            {errMsg ? <p> ERROR: {errMsg} </p> : null}
        </section>
    )
}