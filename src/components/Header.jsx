
export default function Header({ userName }) {
    return (
        <div className="header">
            <h1> NC Correspondence </h1>
            <p> user: {userName} </p>
        </div>
    )
}