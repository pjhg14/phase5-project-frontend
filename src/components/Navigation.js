import { NavLink } from "react-router-dom"

function Navigation() {
    return(
        <nav>
            <NavLink to="/">Login/Logout</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/applications">Applications</NavLink>
            <NavLink to="/businesses">Buisnesses</NavLink>
            <NavLink to="/contacts">Contacts</NavLink>
            
        </nav>
    )
}

export default Navigation