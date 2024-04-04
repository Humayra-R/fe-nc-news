import { Link } from "react-router-dom"

export default function NavBar() {

    return (
            <nav className="nav-bar">           
                <Link to="/">HOME</Link> 
                <Link to="/articles">EXPLORE</Link>
           </nav>
    
    )
}