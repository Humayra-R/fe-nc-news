import { Link } from "react-router-dom"

export default function NavBar() {
    return (
    <nav className="navbar">
        <div>
           <Link to="/"> Home </Link>   
        </div>
       <div>
           <Link to="/articles"> Articles </Link>
       </div>
    </nav>
    )
}