import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'

export default function ArticleTopics({ setArticles }) {
    let [ searchParams, setSearchParams ] = useSearchParams()
    const [ topics, setTopics ] = useState([])
    const [ checkedTopic,  setCheckedTopic ] = useState('')
    
    const filterByQuery = searchParams.get('topic')

    useEffect(() => {
        axios.get('https://nc-news-xrc9.onrender.com/api/topics')
        .then(({ data }) => {
            setTopics(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (filterByQuery) setCheckedTopic(filterByQuery)
        
        axios.get(`https://nc-news-xrc9.onrender.com/api/articles`, {
            params: {
                topic: checkedTopic
            }
        })
        .then(({ data }) => {
            const {articles} = data
            setArticles(articles)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [checkedTopic, filterByQuery])
    
    const sortByTopic = (topicName) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('topic', topicName)
        setSearchParams(newParams)
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            setCheckedTopic(event.target.name)
            sortByTopic(event.target.name)
        }
        else if (!event.target.checked) {
            setCheckedTopic('')
            const newParams = new URLSearchParams(searchParams)
            newParams.delete('topic')
            setSearchParams(newParams)
        }
    }

    return (
        <div className="filter-container">
           <form>
            <ul>
                <h3> Filter By Topic: </h3>
                {topics.map((topic, index) => {
                    return (
                        <div key={`${topic.slug}${index}`}>
                            <input type="checkbox"  name={topic.slug} onChange={handleChange} id={`${topic.slug}${index}`} defaultChecked={checkedTopic && checkedTopic === topic.slug ? true : false} disabled={checkedTopic && checkedTopic !== topic.slug ? true : false} />
                            <label htmlFor="filter-topic"> {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </label> 
                        </div>    
                    )
                })}
            </ul>
           </form>
        </div>
        
    )
}