import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComments, faCalendar, faLightbulb, faAt } from '@fortawesome/free-solid-svg-icons'

export default function ArticlesList({ articles }) {
    return (
        <div className="article-container">
            <main >
                <ul> 
                    <article >
            {
                articles.map((article) => {
                    const formatDate = new Date(article.created_at) 
                    const date = formatDate.toLocaleDateString()

                    return (
                    <div className="article-card" key={article.article_id}>
                        <div className="image-card" >
                            <img className="article-image" src={article.article_img_url} alt="article image"/> 
                        </div>
                        <div className="card-content">
                            <div className="article-top">
                                <div>
                               {<FontAwesomeIcon icon={faCalendar} size='xs' />} {date} 
                                </div>
                                <div>
                                <FontAwesomeIcon icon={faLightbulb} size='xs' /> {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
                                </div>
                            </div>
                        <div>
                            <h2> {article.title} </h2> 
                        </div>
                            <div>
                                <FontAwesomeIcon icon={faAt} size='xs' /> {article.author.charAt(0).toUpperCase() + article.author.slice(1)}
                            </div>
                            <div className="article-bottom" >
                                <div className="like-and-comment">
                                    <span className="like">
                                        {<FontAwesomeIcon icon={faThumbsUp} size='xs' />} {article.votes}
                                    </span>
                                    <span className="comment">
                                     {<FontAwesomeIcon icon={faComments} size='xs' />} {article.comment_count}   
                                    </span>
                                    
                                </div>
                                <div className="read-article">
                                   <Link to={`/article/${article.article_id}`}>
                                   Read Article
                                    </Link> 
                                </div>
                            </div> 
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