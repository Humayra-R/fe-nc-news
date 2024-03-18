import { useEffect, useState } from "react"
import ArticlesApiRequest from './ArticlesApiRequest'
import ArticlesList from "./ArticlesList"
import UserArticleTopics from "./UserArticleTopics"

export default function Home({ loggedUser }) {
    const [ userArticles, setUserArticles ] = useState([])
    
    useEffect(() => {
        ArticlesApiRequest()
        .then(({ articles }) => {
            const userArticles = articles.filter((article) => {
                if (article.author === loggedUser.username) {
                    return article
                } 
            })
            setUserArticles(userArticles)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [loggedUser])

    return (
        <>
        <UserArticleTopics userArticles={userArticles} setUserArticles={setUserArticles} loggedUser={loggedUser} />
        <ArticlesList articles={userArticles} />
        </>
    )
}