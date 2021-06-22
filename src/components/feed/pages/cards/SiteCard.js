import { useState } from "react"
import { useDispatch } from "react-redux";
import { Icon } from 'semantic-ui-react'
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
        <div id="card" key={site.id}>
            {editing ?
                // Non edit card
                <div>
                    <SiteForm site={site} setEditing={setEditing}/>
                    <Icon name="cancel" onClick={() => setEditing(false)}/> 
                </div> 
                :
                // Edit card
                <div>
                    <p>{site.domain}</p>
                    <a href={site.url} target="_blank" rel="noreferrer">{site.url}</a>
                    <Icon name="edit" onClick={() => setEditing(true)}/>
                </div> 
            }
            <Icon name="trash" onClick={handleDelete}/>
        </div>
    )
}

export default SiteCard