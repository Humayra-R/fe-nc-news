import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faNewspaper } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {

    return (
            <nav className="nav-bar">           
                <Link to="/"> HOME </Link> 
                <Link to="/articles"> EXPLORE </Link>
           </nav>
    
    )
}