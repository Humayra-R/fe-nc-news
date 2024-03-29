import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faNewspaper } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {

    return (
            <nav className='nav-bar' >
                <ul>           
                    <Link to="/"> {<FontAwesomeIcon icon={faHouseUser} />} </Link> 
                    <Link to="/articles"> {<FontAwesomeIcon icon={faNewspaper} />} </Link>

                </ul>
           </nav>
    
    )
}