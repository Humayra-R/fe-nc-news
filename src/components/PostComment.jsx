// import { useState } from "react"

// export default function PostComment({ username, article_id }) {
//     const [input, setInput] = useState({
//         body: '',
//         user_name: ''
//     })

//     const handleChange = () => {

//     }

//     return (
//         <section>
//             <form className="post-comment">
//                 <label htmlFor="write-comment"> Leave a comment: </label>
//                 <input name="body" value={input.body} onChange={handleChange} id="write-comment" />
//                 <label htmlFor="username"> Username: </label>
//                 <input name="user_name" value={input.user_name} onChange={handleChange} id="username" />
//                 <button aria-label="button for publishing comment"> post </button>
//             </form>
//         </section>
//     )
// }