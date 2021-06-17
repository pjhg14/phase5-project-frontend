import { useContext } from "react"
import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"
import { UserContext } from "../MainContent"

function ContactList() {
    const { url } = useRouteMatch()
    const user = useContext(UserContext)

    if (user.get.error) return <h1>Please log in</h1>

    const contacts = user.get.applications.map(application => {
        return application.contacts
    }).flat()

    const contactList = contacts.map(contact => {
        return(
            <div id="card" key={contact.id}>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <Link to={`/feed/businesses/info/${contact.id}`}>Info</Link>
            </div>
        )
    })

    return(
        <div>
            <h3>Contact List:</h3>
            {contactList}
            
            <h4>New Contact</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ContactList