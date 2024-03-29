import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons'

export default function ArticlesList({ articles }) {
    return (
        <div>
            <main className="articles-container">
                <ul> 
                    <article>
                        <h2> Articles </h2>
            {
                articles.map((article) => {
                    return (
                        <div className='article' key={article.article_id}>
                            <img className="article-image" src={article.article_img_url} alt="article image"/>
                            <div>
                                <Link to={`/article/${article.article_id}`}>
                                Title: {article.title}
                                </Link>
                            </div>
                            <div>
                                Author: {article.author}
                            </div>
                            <div>
                                Topic: {article.topic}
                            </div>
                            <div>
                                Created At: {article.created_at}
                            </div>
                            <div>
                                {<FontAwesomeIcon icon={faThumbsUp} />}: {article.votes}
                            </div>
                            <div>
                                {<FontAwesomeIcon icon={faComments} />}: {article.comment_count}
                            </div>
                        </div>
                    )
                })
            }
                    </article>
                </ul>
            </main>
        </div>
        )
}