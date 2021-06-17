import { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";

function ApplicationInfo() {
    const { id } = useParams()
    const { url } = useRouteMatch()
    const [application, setApplication] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`http://localhost:3000/applications/${id}`)
            .then((resp) => resp.json())
            .then(queriedApplication => {
                setApplication(queriedApplication)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading</h1>

    const contactList = application.contacts.map(contact => {
        return(
            <div id="card" key={contact.id}>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <Link to={`/feed/contacts/info/${contact.id}`}>Info</Link>
            </div>
        )
    })

    function handleDelete() {
        fetch(`http://localhost:3000/applications/${id}`, {
            method: "DELETE",
        })
            .then((resp) => resp.json())
            .then(() => {
                // handle delete on frontend
            });
    }

    return(
        <div>
            <h2>Application:</h2>
            <p>Apply Date: {application.apply_date}</p>
            <p>Start Date: {application.start_date}</p>
            <p>Wage type: {application.wage_type}</p>
            <p>Wage: {application.wage}</p>

            <h3>Business Info:</h3>
            <p>Name: {application.business.name}</p>
            <p>address: {application.business.address}</p>

            <h3>Contacts:</h3>
            {contactList}
            
            <h4>Edit Application</h4>
            <Link to={`${fixedPath}/edit/${id}`}>edit</Link>

            <h4>Delete Application</h4>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ApplicationInfo