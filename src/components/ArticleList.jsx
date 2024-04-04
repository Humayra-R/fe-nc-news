import { useEffect, useState } from 'react'
import axios from "axios"

export default function ArticleList({ article }) {
    const [ votes, setVotes ] = useState(0)
    const [ errMsg, setErrMsg ] = useState(null)
    
    useEffect(() => {
        setVotes(article.votes)
    }, [])

    const handleClick = (num) => {
        setVotes((currVotes) => {
           return currVotes + num
        })
        axios.patch(`https://nc-news-xrc9.onrender.com/api/articles/${article.article_id}`, { inc_votes: num })
        .catch((err) => {
            setVotes((currVotes) => {
                return currVotes - num
             })
            const { msg } = err.response.data
            setErrMsg(msg)
        })
    }
        
    if (errMsg) return <p> ERROR: {errMsg} </p>

    const formatDate = new Date(article.created_at) 
    const date = formatDate.toLocaleDateString()

    return (
        <main>
            <img src={article.article_img_url} alt="article image"/>
            <h2> {article.title} </h2>
            <p> Author: {article.author} </p>
            <p> Topic: {article.topic} </p>
            <p> {article.body} </p>
            <p> {date} </p>
            <p> Article ID: {article.article_id} </p>
            <button onClick={() => handleClick(-1)} aria-label='button for subtracting a vote from the article'> - </button> 
            Votes: { votes }
            <button onClick={() => handleClick(1)} aria-label='button for adding a vote to the article'> + </button>
            <p> Comment count: {article.comment_count} </p>
        </main>
    )
}