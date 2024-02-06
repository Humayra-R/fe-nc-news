export default function CommentsList({ comments }) {
    return (
        <div>
        <h2> Comments: </h2>
        <ul>
        {
            comments.map((comment) => {
                return (
                    <li key={comment.comment_id} >
                        <div>
                            user: {comment.author}
                        </div>
                        <div>
                            {comment.body}
                        </div>
                        <div>
                            comment id: {comment.comment_id}
                        </div>
                        <div>
                            {comment.created_at}
                        </div>
                        <div>
                            votes: {comment.votes}
                        </div>
                    </li>
                )
            })
        }
    </ul>
    </div>
    )
    
}