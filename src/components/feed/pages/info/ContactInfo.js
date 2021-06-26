import { useEffect, useState } from "react"
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom"

function ContactInfo() {
    const { url } = useRouteMatch()
    const { id } = useParams()
    const history = useHistory()
    const [contact, setContact] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedContact => {
                setContact(queriedContact)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading...</h1>

    function handleDelete() {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                    history.push("/feed/contacts")
                }
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
            <p>Name: {contact.full_name}</p>
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