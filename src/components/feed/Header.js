import { useSelector } from "react-redux"

function Header() {
    const user = useSelector(state => state.user)
    return(
        <div>
            <h1>CareerPad</h1>
            <h3>Hello {user.username}</h3>
        </div>
    )
}

export default Header