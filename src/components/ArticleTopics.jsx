import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import ArticlesApiRequest from "./ArticlesApiRequest"
import ArticlesSort from './ArticlesSort'
import ArticlesData from "./ArticlesData"

export default function ArticleTopics({ setArticles }) {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ topics, setTopics ] = useState([])
    const [ selectedTopic, setSelectedTopic ] = useState('')
    
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by')

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
                console.log(err.response.data.msg)
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
        <div>
            <div className="filter-container">
                <form>
                    <ul>
                        <h3> Filter Articles </h3>
                        <h4> Topic: </h4>
                        {topics.map((topic, index) => {
                            return (
                            <div key={`${topic.slug}${index}`}>
                            <input type="checkbox"  name={topic.slug} onChange={handleChange} id={`${topic.slug}${index}`} checked={selectedTopic === topic.slug ? true : false} disabled={selectedTopic && selectedTopic !== topic.slug ? true : false} />
                            <label htmlFor="filter-topic"> {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </label> 
                            </div>
                            )
                        })}
                    </ul>
                </form>
            </div>
            <ArticlesSort selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} setArticles={setArticles}  />
        </div>
    )
}