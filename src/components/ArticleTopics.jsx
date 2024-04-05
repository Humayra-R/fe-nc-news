import { useEffect, useState } from "react"
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import ArticlesApiRequest from "./api-request/ArticlesApiRequest"
import ArticlesSort from './ArticlesSort'

export default function ArticleTopics({ setArticles }) {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ topics, setTopics ] = useState([])
    const [ selectedTopic, setSelectedTopic ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errMsg, setErrMsg ] = useState('')
    
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by')

    useEffect(() => {
        setIsLoading(true)
        axios.get('https://nc-news-xrc9.onrender.com/api/topics')
        .then(({ data }) => {
            setIsLoading(false)
            setTopics(data)
        })
        .catch((err) => {
            setIsLoading(false)
            const { msg } = err.response.data
            setErrMsg(msg)
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (topicQuery) {
            setSelectedTopic(topicQuery)
            axios.get(`https://nc-news-xrc9.onrender.com/api/articles`, {
                params: {
                    topic: selectedTopic || topicQuery
                }
            })
            .then(({ data }) => {
                const { articles } = data
                if (sortByQuery === 'date') {
                    const articlesAsc = articles.reverse()
                    setArticles(articlesAsc)
                }
                else if (sortByQuery === 'count-asc') {
                    const sortArt = (a, b) => {
                    const articleA = Number(a.comment_count)
                    const articleB = Number(b.comment_count)
    
                        let comparison = 0
                        if (articleA > articleB) {
                            comparison = 1
                        }
                        else if (articleA < articleB) {
                            comparison = -1
                        }
                        return comparison * -1
                    }
                    const sortedArticles = articles.sort(sortArt)
                    setArticles(sortedArticles)
                }
                else if (sortByQuery === 'count-desc') {
                    const sortArt = (a, b) => {
                    const articleA = Number(a.comment_count)
                    const articleB = Number(b.comment_count)
    
                        let comparison = 0
                        if (articleA > articleB) {
                            comparison = 1
                        }
                        else if (articleA < articleB) {
                            comparison = -1
                        }
                        return comparison
                    }
                    const sortedArticles = articles.sort(sortArt)
                    setArticles(sortedArticles)
                }
                else if (sortByQuery === 'votes-asc') {
                    const sortArt = (a, b) => {
                    const articleA = Number(a.votes)
                    const articleB = Number(b.votes)
    
                        let comparison = 0
                        if (articleA > articleB) {
                            comparison = 1
                        }
                        else if (articleA < articleB) {
                            comparison = -1
                        }
                        return comparison * -1
                    }
                    const sortedArticles = articles.sort(sortArt)
                    setArticles(sortedArticles)
                }
                else if (sortByQuery === 'votes-desc') {
                    const sortArt = (a, b) => {
                    const articleA = Number(a.votes)
                    const articleB = Number(b.votes)
    
                        let comparison = 0
                        if (articleA > articleB) {
                            comparison = 1
                        }
                        else if (articleA < articleB) {
                            comparison = -1
                        }
                        return comparison
                    }
                    const sortedArticles = articles.sort(sortArt)
                    setArticles(sortedArticles)
                }
                setArticles(articles)
            })
            .catch((err) => {
                const { msg } = err.response.data
                setErrMsg(msg)
            
            })
        }
    }, [topicQuery, selectedTopic, sortByQuery])
    
    const addTopicParam = (topicName) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('topic', topicName)
        setSearchParams(newParams)
    }

    const deleteTopicParam = (topicName) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.delete('topic', topicName)
        setSearchParams(newParams)
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            setSelectedTopic(event.target.name)
            addTopicParam(event.target.name)
        }
        else if (!event.target.checked) {
            setSelectedTopic('')
            deleteTopicParam(event.target.name)
            if (sortByQuery !== 'date') {
                ArticlesApiRequest()
                .then(({ articles }) => {
                    setArticles(articles)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    if (!topicQuery && selectedTopic) {
        setSelectedTopic('')
        ArticlesApiRequest()
        .then(({ articles }) => {
            setArticles(articles)
        })
    }

    return (
            <div className="topic-container spacing">
                <form>
                    <ul className="box-spacing">
                        <h3 className="header-spacing" > Filter Articles </h3>
                        {selectedTopic ? <p className="display-text"> Uncheck box to select another topic </p> : null}
                        <h4 className="header-spacing"  > Topic: </h4>
                        {topics.map((topic, index) => {
                            return (
                            <div key={`${topic.slug}${index}`} className="text-spacing">
                            <input type="checkbox"  name={topic.slug} onChange={handleChange} id={`${topic.slug}${index}`} checked={selectedTopic === topic.slug ? true : false} disabled={selectedTopic && selectedTopic !== topic.slug ? true : false} />
                            <label htmlFor="filter-topic"> {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </label> 
                            </div>
                            )
                        })}
                    </ul>
                </form>
            <ArticlesSort selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} setArticles={setArticles}  />
        </div>
    )
}