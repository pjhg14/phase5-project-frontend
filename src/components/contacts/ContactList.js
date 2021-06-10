import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"

function ContactList() {
    const { url } = useRouteMatch()

    return(
        <div>
            <h3>Contact List:</h3>
            <Link to={`${url}/info/1`}>Contact</Link>
            
            <h4>New Contact</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ContactList