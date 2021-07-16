import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Button, Card, Divider } from "semantic-ui-react";
import { applicationURL } from "../../../../utility/Links";
import ContactCard from "../cards/ContactCard";

function ApplicationInfo() {
    // Hooks
    const { id } = useParams()
    const { url } = useRouteMatch()
    const history = useHistory()

    // State
    const [application, setApplication] = useState(null)
    const [loaded, setLoaded] = useState(false)
    
    // Path
    const fixedPath = url.split("/").slice(0,3).join("/") // "/feed/applications"

    useEffect(() => {
        fetch(`${applicationURL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedApplication => {
                setApplication(queriedApplication)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading</h1>

    const contactList = application.contacts.map(contact => {
        return(
            <ContactCard contact={contact} key={contact.id}/>
        )
    })

    function handleDelete() {
        fetch(`${applicationURL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                    history.push(".feed/applications")
                }
            });
    }

    return(
        <div>
            <h2>Application:</h2>
            <p>Application alias: {application.alias}</p>
            <p>Role: {application.role}</p>
            <p>Apply Date: {application.apply_date}</p>
            <p>Start Date: {application.start_date}</p>
            <p>Wage type: {application.wage_type}</p>
            <p>Wage: {application.wage}</p>

            <h3>Business Info:</h3>
            <p>Name: {application.business.name}</p>
            <p>address: {application.business.address}</p>

            <h3>Contacts:</h3>
            <Card.Group centered>
                {contactList}
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

export default ApplicationInfo