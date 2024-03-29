import { useParams } from "react-router-dom"
import Article from './Article'
import Comments from './Comments'

export default function ArticlePage({ loggedUser }) {
    const { username } = loggedUser
    const { article_id } = useParams()

    return (
        <div>
            <Article article_id={article_id} />
            <Comments article_id={article_id} username={username} />
        </div>
    )
}