import { useEffect, useState } from 'react'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faComments, faCalendar, faLightbulb, faAt } from '@fortawesome/free-solid-svg-icons'

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
        <main className="article-page-container" >
            <img src={article.article_img_url} alt="article image"/>
            <p> <FontAwesomeIcon icon={faCalendar} /> {date} </p>
            <div className='title-topic'>
               <h2> {article.title} </h2>
               <p> <FontAwesomeIcon icon={faLightbulb} /> {article.topic} </p> 
            </div>
            <div> 
                <FontAwesomeIcon icon={faAt} />{article.author} 
            </div>
            <div className='body'>
                <p> {article.body} </p> 
            </div>
            <div className='bottom'>
                <p> { votes } </p>
                <button onClick={() => handleClick(1)} aria-label='button for subtracting a vote from the article'> <FontAwesomeIcon icon={faThumbsUp} size='lg'/> </button> 
                <button onClick={() => handleClick(-1)} aria-label='button for adding a vote to the article'> <FontAwesomeIcon icon={faThumbsDown} size='lg'/> </button> 
            </div> 
           
        </main>
    )
}