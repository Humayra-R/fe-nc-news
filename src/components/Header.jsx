import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'

export default function Header({ userName }) {
    return (
        <div className="container">
            <h1> The Coders Correspondence </h1>  
            <NavBar /> 
            <button className='user-button'> {<FontAwesomeIcon icon={faUserLarge} fixedWidth={true} />} </button>
        </div>
    )
}