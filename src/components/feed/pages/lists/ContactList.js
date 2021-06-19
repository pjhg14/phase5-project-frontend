import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"

function ContactList() {
    const { url } = useRouteMatch()
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/contacts/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedContacts => setContacts(queriedContacts))
    },[])

    const contactList = contacts.map(contact => {
        return(
            <div id="card" key={contact.id}>
                <p>{contact.full_name}</p>
                <p>{contact.email}</p>
                <Link to={`/feed/contacts/info/${contact.id}`}>Info</Link>
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