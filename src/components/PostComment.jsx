import { useState } from "react"
import axios from 'axios'

export default function PostComment({ username, article_id }) {
    const [input, setInput] = useState({
        body: '',
        user_name: ''
    })
    const [isPosting, setIsPosting] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target
        setInput({ ...input, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsPosting(true)
        axios.post(`https://nc-news-xrc9.onrender.com/api/articles/${article_id}/comments`, input)
        .then((res) => {
            setIsPosting(false)
            console.log(res)
        })
        .catch((err) => {
            setIsPosting(false)
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="post-comment">
                <label htmlFor="write-comment"> Leave a comment: </label>
                <input name="body" value={input.name} onChange={handleChange} id="write-comment" />
                <label htmlFor="username"> Username: </label>
                <input name="user_name" value={input.value} onChange={handleChange} id="username" />
                <button aria-label="button for publishing comment"> post </button>
            </form>
            {isPosting ? <p> posting... </p> : null}
            {errMsg ? <p> ERROR: {errMsg} </p> : null}
        </section>
    )
}