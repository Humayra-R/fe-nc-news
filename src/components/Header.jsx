import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge, faAt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Header({ userName }) {

    const [ isVisible, setIsVisisble ] = useState(false)

    return (
        <div className="container">
            <h1> The Coders Correspondence </h1>  
            <NavBar /> 
            <div className='user-info' onMouseEnter={() => setIsVisisble(true)} onMouseLeave={() => setIsVisisble(false)} >
            {isVisible ? <p className='user-hover' > {userName}<FontAwesomeIcon icon={faAt} size='xs'/>  </p> : null} 
                {<FontAwesomeIcon icon={faUserLarge} />}
            </div>
        </div>
    )
}