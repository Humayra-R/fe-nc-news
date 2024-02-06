// import { useEffect, useState } from "react"
// import ApiRequest from "./ApiRequest"
// import CommentsList from "./CommentsList"


// export default function Comments({ article_id, username }) {
//     const [comments, setComments] = useState([])
//     const [isLoading, setIsLoading] = useState(false)
//     const [errMsg, setErrMsg] = useState(null)

//     useEffect(() => {
//         setIsLoading(true)
//         ApiRequest(`/articles/${article_id}/comments`)
//         .then((data) => {
//             const { comments } = data
//             setComments(comments)
//             setIsLoading(false)
//         })
//         .catch((err) => {
//             setIsLoading(false)
//             const { msg } = err.response.data
//             setErrMsg(msg)
//         })
//     }, [article_id])

//     if (isLoading) return <p className="intermediary"> ... loading comments </p>

//     if (errMsg) return <p className="intermediary"> {errMsg} </p>

//     return (
//         <div>
//             <CommentsList comments={ comments } />
//         </div>
//     ) 
// }