import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory, useParams, useRouteMatch } from "react-router-dom"
import { Button, Card, Divider } from "semantic-ui-react"
import { contactURL } from "../../../../utility/Links"

function ContactInfo() {
    // Hooks
    const user = useSelector(state => state.user)
    const { url } = useRouteMatch()
    const { id } = useParams()
    const history = useHistory()

    // State
    const [contact, setContact] = useState(null)
    const [loaded, setLoaded] = useState(false)

    // Path
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`${contactURL}/${id}`, {
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
        fetch(`${contactURL}/${id}`, {
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
            <Card key={conversation.id}>
                <Card.Content>
                    <Card.Header>
                        Message from: {user.full_name === conversation.author ? "Me" : conversation.author}
                    </Card.Header>
                    <Card.Meta>
                        Recieved: {conversation.contact_date}
                    </Card.Meta>
                    <Card.Description>
                        {conversation.content}
                    </Card.Description>
                </Card.Content>
                
            </Card>
        )
    })

    return(
        <div>
            <h3>Contact:</h3>
            <p>Name: {contact.full_name}</p>
            <p>Email: {contact.email}</p>
            <p>Profile URL: {contact.profile_url ? contact.profile_url : "<None Provided>"}</p>

            <h4>Conversations:</h4>
            <Card.Group centered>
                {conversationList}
            </Card.Group>

            <Divider horizontal />

            <div id="button-bar">
                <Button icon="arrow left" onClick={() => history.push(fixedPath)} />
                <Button onClick={() => history.push(`${fixedPath}/edit/${id}`)}>Edit</Button>
                <Button onClick={handleDelete} color="red" inverted>Delete</Button>
            </div>
        </div>
    )
}

export default ContactInfo