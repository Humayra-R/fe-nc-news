export default function ArticleList({ article }) {
    return (
        <main>
            <img src={article.article_img_url} alt="article image"/>
            <h2> {article.title} </h2>
            <p> Author: {article.author} </p>
            <p> Topic: {article.topic} </p>
            <p> {article.body} </p>
            <p> Article ID: {article.article_id} </p>
            <p> Votes: {article.votes} </p>
            <p> Comment count: {article.comment_count} </p>
        </main>
    )
}