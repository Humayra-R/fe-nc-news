import { useEffect, useState } from "react"
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import ArticlesApiRequest from "./api-request/ArticlesApiRequest"
import UserArticlesSort from "./UserArticlesSort"



export default function UserArticleTopics({ setUserArticles, loggedUser }) {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ topicsHome, setTopicsHome ] = useState([])
    const [ selectedTopicHome, setSelectedTopicHome ] = useState('')
    const [ isLoadingTopicOptions, setIsLoadingTopicOptions ] = useState(false)
    const [ isLoadingArticles, setIsLoadingArticles ] = useState(false)
    
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by')

    useEffect(() => {
        setIsLoadingTopicOptions(true)
        axios.get('https://nc-news-xrc9.onrender.com/api/topics')
        .then(({ data }) => {
            setIsLoadingTopicOptions(false)
            setTopicsHome(data)
        })
        .catch((err) => {
            setIsLoadingTopicOptions(false)
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (topicQuery) {
            setIsLoadingArticles(true)
            setSelectedTopicHome(topicQuery)
            axios.get(`https://nc-news-xrc9.onrender.com/api/articles`, {
                params: {
                    topic: selectedTopicHome || topicQuery
                }
            })
            .then(({ data }) => {
                setIsLoadingArticles(false)
                const { articles } = data
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
                if (sortByQuery === 'date') {
                    const articlesAsc = loggedUserArticles.reverse()
                    setUserArticles(articlesAsc)
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
                    const sortedArticles = loggedUserArticles.sort(sortArt)
                    setUserArticles(sortedArticles)
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
                    const sortedArticles = loggedUserArticles.sort(sortArt)
                    setUserArticles(sortedArticles)
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
                    const sortedArticles = loggedUserArticles.sort(sortArt)
                    setUserArticles(sortedArticles)
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
                    const sortedArticles = loggedUserArticles.sort(sortArt)
                    setUserArticles(sortedArticles)
                }
                setUserArticles(loggedUserArticles)
            })
            .catch((err) => {
                setIsLoadingArticles(false)
                console.log(err.response.data.msg)
            })
        }
    }, [topicQuery, selectedTopicHome, sortByQuery])
    
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
            setSelectedTopicHome(event.target.name)
            addTopicParam(event.target.name)
        }
        else if (!event.target.checked) {
            setSelectedTopicHome('')
            deleteTopicParam(event.target.name)
            if (sortByQuery !== 'date') {
                ArticlesApiRequest()
                .then(({ articles }) => {
                    const loggedUserArticles = articles.filter((article) => {
                        if (article.author === loggedUser.username) {
                            return article
                        }
                    })
                    setUserArticles(loggedUserArticles)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    if (!topicQuery && selectedTopicHome) {
        setSelectedTopicHome('')
        ArticlesApiRequest()
        .then(({ articles }) => {
            const loggedUserArticles = articles.filter((article) => {
                if (article.author === loggedUser.username) {
                    return article
                }
            })
            setUserArticles(loggedUserArticles)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="query-container">
                <form>
                    <ul>
                        <h3> Filter Articles </h3>
                        <h4> Topic: </h4>
                        {isLoadingTopicOptions ? <p> Loading options... </p> : null}
                        {topicsHome.map((topic, index) => {
                            return (
                            <div key={`${topic.slug}${index}`}>
                            <input type="checkbox"  name={topic.slug} onChange={handleChange} id={`${topic.slug}${index}`} checked={selectedTopicHome === topic.slug ? true : false} disabled={selectedTopicHome && selectedTopicHome !== topic.slug ? true : false} />
                            <label htmlFor="filter-topic"> {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)} </label> 
                            </div>
                            )
                        })}
                    </ul>
                </form>
            </div>
            <UserArticlesSort selectedTopicHome={selectedTopicHome} setSelectedTopicHome={setSelectedTopicHome} setUserArticles={setUserArticles} loggedUser={loggedUser} />
        </div>
    )
}