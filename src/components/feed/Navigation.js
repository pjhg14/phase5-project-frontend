import { NavLink } from "react-router-dom"

function Navigation() {
    return(
        <nav>
            <NavLink to="/">Logout</NavLink>
            <NavLink to="/feed/dashboard">Dashboard</NavLink>
            <NavLink to="/feed/profile">Profile</NavLink>
            <NavLink to="/feed/applications">Applications</NavLink>
            <NavLink to="/feed/businesses">Buisnesses</NavLink>
            <NavLink to="/feed/contacts">Contacts</NavLink>
            
        </nav>
    )
}

export default Navigation