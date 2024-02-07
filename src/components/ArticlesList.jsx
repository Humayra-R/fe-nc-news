import { Link } from "react-router-dom"

export default function ArticlesList({ articles }) {
    return (
        <main className="article-container">
            <h2>Articles: </h2>
            <ul>
            {
                articles.map((article) => {
                    return (
                        <li className='article' key={article.article_id}>
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
                                Id: {article.article_id}
                            </div>
                            <div>
                                Votes: {article.votes}
                            </div>
                            <div>
                                Comment Count: {article.comment_count}
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        </main>
        )
}