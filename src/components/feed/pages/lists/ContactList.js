import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"
import { Card, Divider } from "semantic-ui-react"
import { contactURL } from "../../../../utility/Links";
import ContactCard from "../cards/ContactCard";

function ContactList() {
    const { url } = useRouteMatch()
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch(`${contactURL}/user/index`, {
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
            <ContactCard contact={contact} key={contact.id}/>
        )
    })

    return(
        <div>
            <h3>Contact List:</h3>
            <Card.Group centered>
                {contactList}
            </Card.Group>
            
            <Divider horizontal>New Contact</Divider>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ContactList