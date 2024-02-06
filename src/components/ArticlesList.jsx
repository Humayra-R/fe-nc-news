export default function ArticlesList({ articles }) {
       return (
        <main className="article-container">
            <ul>
            {
                articles.map((article) => {
                    return (
                        <li key={article.article_id}>
                            <div>
                                Image: {article.article_img_url}
                            </div>
                            <div>
                                Title: {article.title}
                            </div>
                            <div>
                                Author: {article.author}
                            </div>
                            <div>
                                Topic: {article.topic}
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