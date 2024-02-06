import { useParams } from "react-router-dom"
import ArticlesData from './ArticlesData'
// import PostComment from "./PostComment"
// import Comments from './Comments'

export default function ArticlePage({ loggedUser }) {
    const { username } = loggedUser
    const { article_id } = useParams()

    return (
        <div>
            <ArticlesData article_id={ article_id } />
            {/* <PostComment username={ username } article_id={ article_id } /> */}
            {/* <Comments article_id={ article_id } username={ username } /> */}
        </div>
    )
}