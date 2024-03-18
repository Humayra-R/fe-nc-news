import NavBar from './NavBar'

export default function Header({ userName }) {
    return (
        <div className="header">
            <h1> Coders Correspondence </h1>
            <NavBar />
            <p> {userName} </p>
        </div>
    )
}