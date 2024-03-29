import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ArticlesApiRequest from "./api-request/ArticlesApiRequest"

export default function ArticlesSort({ selectedTopic, setArticles }) {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ appliedQuery, setAppliedQuery ] = useState('')
    
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by') 

    useEffect(() => {
        if (sortByQuery === 'date' && !selectedTopic) {
            setAppliedQuery(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const articlesAsc = articles.reverse()
                setArticles(articlesAsc)
            })
        }
        else if (sortByQuery === 'count-asc' && !selectedTopic) {
            setAppliedQuery(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
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
            })
        }
        else if (sortByQuery === 'count-desc' && !selectedTopic) {
            setAppliedQuery(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
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
            })
        }
        else if (sortByQuery === 'votes-asc' && !selectedTopic) {
            setAppliedQuery(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
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
            })
        }
        else if (sortByQuery === 'votes-desc' && !selectedTopic) {
            setAppliedQuery(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
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
            })
        }
    }, [sortByQuery, selectedTopic])

    const addSortByParam = (sortBy) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('sort_by', sortBy)
        setSearchParams(newParams)
    }

    const deleteSortByParam = (sortBy) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.delete('sort_by', sortBy)
        setSearchParams(newParams)
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            setAppliedQuery(event.target.name)
            addSortByParam(event.target.name)
        }
        else if (!event.target.checked) {
            setAppliedQuery('')
            deleteSortByParam(event.target.name)
            if (!topicQuery) {
                ArticlesApiRequest()
                .then(({ articles }) => {
                setArticles(articles)
            })
            }
        }
    }

    if (!sortByQuery && appliedQuery) {
        setAppliedQuery('')
        ArticlesApiRequest()
        .then(({ articles }) => {
        setArticles(articles)
        })
    }

    return (
        <div className="query-container">
            <form>
            <ul>
                <h3> Sort Articles </h3>
                {appliedQuery ? <p> Uncheck box to select another sorting option </p> : null }
                <h4>  Date: </h4>
                <input type="checkbox" name="date" id="date" checked={appliedQuery === 'date' ? true : false} disabled={appliedQuery && appliedQuery !== 'date' ? true : false} onChange={handleChange} />
                <label htmlFor="date"> Oldest to Newest </label>
                <h4> Likes: </h4>
                <div>
                    <input type="checkbox" name="votes-asc" id="votes-asc"  checked={appliedQuery === 'votes-asc' ? true : false} disabled={appliedQuery && appliedQuery !== 'votes-asc' ? true : false} onChange={handleChange} />
                    <label htmlFor="votes-asc" > Highest to Lowest </label>
                </div>
                <div>
                    <input type="checkbox" name="votes-desc" id="votes-desc" checked={appliedQuery === 'votes-desc' ? true : false} disabled={appliedQuery && appliedQuery !== 'votes-desc' ? true : false} onChange={handleChange} />
                    <label htmlFor="votes-desc" > Lowest to Highest </label>
                </div>
                <h4> Comments: </h4>
                <div>
                    <input type="checkbox" name="count-asc" id="count-asc"  checked={appliedQuery === 'count-asc' ? true : false} disabled={appliedQuery && appliedQuery !== 'count-asc' ? true : false} onChange={handleChange} />
                    <label htmlFor="count-asc" > Highest to Lowest </label>
                </div>
                
                <div>
                    <input type="checkbox" name="count-desc" id="count-desc" checked={appliedQuery === 'count-desc' ? true : false} disabled={appliedQuery && appliedQuery !== 'count-desc' ? true : false} onChange={handleChange} />
                    <label htmlFor="count-desc" > Lowest to Highest </label>
                </div>
             
            </ul>
            </form>
        </div>
    )
}