import { Link } from "react-router-dom"

export default function ArticlesList({ articles }) {
    return (
        <main className="articles-container">
            <ul>
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
                                Likes: {article.votes}
                            </div>
                            <div>
                                Comments: {article.comment_count}
                            </div>
                        </div>
                    )
                })
            }
            </ul>
        </main>
        )
}