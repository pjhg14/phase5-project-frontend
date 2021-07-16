import { useEffect, useState } from "react"
import { useHistory, useParams, useRouteMatch } from "react-router-dom"
import { Button, Card, Divider } from "semantic-ui-react"
import { businessURL } from "../../../../utility/Links"
import ApplicationCard from "../cards/ApplicationCard"

function BusinessInfo() {
    // Hooks
    const { url } = useRouteMatch()
    const { id } = useParams()
    const history = useHistory()

    // State
    const [business, setBusiness] = useState(null)
    const [loaded, setLoaded] = useState(false)

    // Path
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`${businessURL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedBusiness => {
                setBusiness(queriedBusiness)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading...</h1>

    const applicationList = business.applications.map(application => {
        return(
            <ApplicationCard application={application} key={application.id}/>
        )
    })

    function handleDelete() {
        fetch(`${businessURL}/${id}`, {
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
                    history.push("/feed/businesses")
                }
            });
    }

    return(
        <div>
            <h3>Business:</h3>
            <p>Name: {business.name}</p>
            <p>address: {business.address}</p>
            <p>Field of work: {business.field}</p>
            <p>Motto: {business.motto}</p>
            <p>Priority: {business.priority}</p>
            <p>Description: {business.description}</p>

            <h4>Applications:</h4>
            <Card.Group centered>
                { applicationList }
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

export default BusinessInfo