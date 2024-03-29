import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

//creat dropdown for user button

export default function Header({ userName }) {
    return (
        <div className="header-container">
            <div className='title'>
              <h1> Coders Correspondence </h1>  
            </div>
            <div className='nav-bar'>
               <NavBar /> 
            </div>
            <div className='user'>
             <p aria-label='user' > {<FontAwesomeIcon icon={faCircleUser} />} </p>     
            </div>
        </div>
    )
}