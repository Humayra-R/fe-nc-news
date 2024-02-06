import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar">
            <div>
               <Link to="/"> Home </Link> 
            </div>
            <div id="articles-link">
                <Link to="/articles"> Articles </Link>
            </div>
        </nav>
    )
}