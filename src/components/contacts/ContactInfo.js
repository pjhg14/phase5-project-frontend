import { useEffect, useState } from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom"

function ContactInfo() {
    const { url } = useRouteMatch()
    const { id } = useParams()
    const [contact, setContact] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`http://localhost:3000/contacts/${id}`)
            .then((resp) => resp.json())
            .then(queriedContact => {
                setContact(queriedContact)
                setLoaded(true)
            })
    },[])

    if (!loaded) return <h1>Loading...</h1>

    // console.log(contact)

    function handleDelete() {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: "DELETE",
        })
            .then((resp) => resp.json())
            .then(() => {
                // handle delete on frontend
            });
    }

    const conversationList = contact.conversations.map(conversation => {
        return(
            <div id="card" key={conversation.id}>
                <p>Content: {conversation.content}</p>
                <p>Contact Date: {conversation.contact_date}</p>
            </div>
        )
    })

    return(
        <div>
            <h3>Contact:</h3>
            <p>Name: {contact.name}</p>
            <p>Email: {contact.email}</p>
            <p>Profile URL: {contact.profile_url}</p>

            <h4>Conversations:</h4>
            {conversationList}

            <h4>Edit Contact</h4>
            <Link to={`${fixedPath}/edit/${id}`}>edit</Link>

            <h4>Delete Contact</h4>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ContactInfo