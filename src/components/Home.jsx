import { useEffect, useState } from "react"
import ArticlesApiRequest from './api-request/ArticlesApiRequest'
import ArticlesList from "./ArticlesList"
import UserArticleTopics from "./UserArticleTopics"

export default function Home({ loggedUser }) {
    const [ userArticles, setUserArticles ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        ArticlesApiRequest()
        .then(({ articles }) => {
            setIsLoading(false)
            const userArticles = articles.filter((article) => {
                if (article.author === loggedUser.username) {
                    return article
                } 
            })
            setUserArticles(userArticles)
        })
        .catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [loggedUser])

    return (
        <>
        <UserArticleTopics userArticles={userArticles} setUserArticles={setUserArticles} loggedUser={loggedUser} />
        {isLoading ? <p> Loading articles... </p> : null}
        <ArticlesList articles={userArticles} />
        </>
    )
}