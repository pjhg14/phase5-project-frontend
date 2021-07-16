import { useState } from "react"
import { useDispatch } from "react-redux";
import { Icon, Card, Button } from 'semantic-ui-react'
import SiteForm from "../forms/SiteForm";

function SiteCard({ site }) {
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)

    function handleDelete(event) {
        fetch(`http://localhost:3000/sites/${site.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json.message)
                dispatch({type: "deleteSite", payload: site})
            });
    }

    return(
        <Card>
            {editing ?
                // Non edit card
                <Card.Content>
                    <SiteForm site={site} setEditing={setEditing}/>
                    <Icon name="cancel" onClick={() => setEditing(false)}/> 
                </Card.Content> 
                :
                // Edit card
                <Card.Content>
                    <Card.Header>{site.domain}</Card.Header>
                    <Card.Meta>
                        <a href={site.url} target="_blank" rel="noreferrer">
                            {site.url}
                        </a>
                    </Card.Meta>
                </Card.Content> 
            }
            <Button.Group>
                <Button icon="edit" onClick={() => setEditing(true)}/>
                <Button icon="trash" color="red" inverted onClick={handleDelete}/>
            </Button.Group>
        </Card>
    )
}

export default SiteCard