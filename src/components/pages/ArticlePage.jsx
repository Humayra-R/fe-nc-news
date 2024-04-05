import { useParams } from "react-router-dom"
import Article from '../Article'
import Comments from '../Comments'

export default function ArticlePage({ loggedUser }) {
    const { username } = loggedUser
    const { article_id } = useParams()

    return (
        <div className="article-page">
            <Article article_id={article_id} username={username} />
            {/* <Comments article_id={article_id} username={username} /> */}
        </div>
    )
}