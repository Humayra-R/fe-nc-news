import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ArticlesApiRequest from "./api-request/ArticlesApiRequest"

export default function UserArticlesSort({ selectedTopicHome, loggedUser, setUserArticles }) {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ appliedQueryHome, setAppliedQueryHome ] = useState('')
    
    const topicQuery = searchParams.get('topic')
    const sortByQuery = searchParams.get('sort_by') 

    useEffect(() => {
        if (sortByQuery === 'date' && !selectedTopicHome) {
            setAppliedQueryHome(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
                const articlesAsc = loggedUserArticles.reverse()
                setUserArticles(articlesAsc)
            })
        }
        else if (sortByQuery === 'count-asc' && !selectedTopicHome) {
            setAppliedQueryHome(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
                
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
            })
        }
        else if (sortByQuery === 'count-desc' && !selectedTopicHome) {
            setAppliedQueryHome(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
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
            })
        }
        else if (sortByQuery === 'votes-asc' && !selectedTopicHome) {
            setAppliedQueryHome(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
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
            })
        }
        else if (sortByQuery === 'votes-desc' && !selectedTopicHome) {
            setAppliedQueryHome(sortByQuery)
            addSortByParam(sortByQuery)
            ArticlesApiRequest()
            .then(({ articles }) => {
                const loggedUserArticles = articles.filter((article) => {
                    if (article.author === loggedUser.username) {
                        return article
                    }
                })
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
            })
        }
    }, [sortByQuery, selectedTopicHome])

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
            setAppliedQueryHome(event.target.name)
            addSortByParam(event.target.name)
        }
        else if (!event.target.checked) {
            setAppliedQueryHome('')
            deleteSortByParam(event.target.name)
            if (!topicQuery) {
                ArticlesApiRequest()
                .then(({ articles }) => {
                    const loggedUserArticles = articles.filter((article) => {
                        if (article.author === loggedUser.username) {
                            return article
                        }
                    })
                setUserArticles(loggedUserArticles)
            })
            }
        }
    }

    if (!sortByQuery && appliedQueryHome) {
        setAppliedQueryHome('')
        ArticlesApiRequest()
        .then(({ articles }) => {
            const loggedUserArticles = articles.filter((article) => {
                if (article.author === loggedUser.username) {
                    return article
                }
            })
        setUserArticles(loggedUserArticles)
        })
    }

    return (
        <div>
            <form>
                <ul >
                <h3 className="header-spacing" > Sort Articles </h3>
                {appliedQueryHome && appliedQueryHome === 'date' ? <p className="display-text" > Uncheck box to display newest to oldest or to select another option </p> : null}
                {appliedQueryHome && appliedQueryHome !== 'date' ? <p className="display-text" > Uncheck box to select another option </p> : null}
                <h4 className="header-spacing" >  Date: </h4>
                <div>
                <input type="checkbox" name="date" id="date" checked={appliedQueryHome === 'date' ? true : false} disabled={appliedQueryHome && appliedQueryHome !== 'date' ? true : false} onChange={handleChange} />
                <label htmlFor="date" > Oldest to Newest </label>
                </div>
                
                <h4 className="header-spacing" > Likes: </h4>
                <div className="inner-text">
                    <input type="checkbox" name="votes-asc" id="votes-asc"  checked={appliedQueryHome === 'votes-asc' ? true : false} disabled={appliedQueryHome && appliedQueryHome !== 'votes-asc' ? true : false} onChange={handleChange} />
                    <label htmlFor="votes-asc" > Highest to Lowest </label>
                </div>
                <div className="inner-text">
                    <input type="checkbox" name="votes-desc" id="votes-desc" checked={appliedQueryHome === 'votes-desc' ? true : false} disabled={appliedQueryHome && appliedQueryHome !== 'votes-desc' ? true : false} onChange={handleChange} />
                    <label htmlFor="votes-desc" > Lowest to Highest </label>
                </div>
                <h4 className="header-spacing" > Comments: </h4>
                <div className="inner-text" >
                    <input type="checkbox" name="count-asc" id="count-asc"  checked={appliedQueryHome === 'count-asc' ? true : false} disabled={appliedQueryHome && appliedQueryHome !== 'count-asc' ? true : false} onChange={handleChange} />
                    <label htmlFor="count-asc" > Highest to Lowest </label>
                </div>
                
                <div className="inner-text" >
                    <input type="checkbox" name="count-desc" id="count-desc" checked={appliedQueryHome === 'count-desc' ? true : false} disabled={appliedQueryHome && appliedQueryHome !== 'count-desc' ? true : false} onChange={handleChange} />
                    <label htmlFor="count-desc" > Lowest to Highest </label>
                </div>
             
                </ul>
            </form>
        </div>
    )
}