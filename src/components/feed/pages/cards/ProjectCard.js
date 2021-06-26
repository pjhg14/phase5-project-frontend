import { useState } from "react"
import { useDispatch } from "react-redux";
import { Icon, Card, Button } from 'semantic-ui-react'
import ProjectForm from "../forms/ProjectForm";

function ProjectCard({ project }) {
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)

    function handleDelete(event) {
        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json.message)
                dispatch({type: "deleteProject", payload: project})
            });
    }

    return(
        <Card>
            {editing ?
                // Non edit card
                <Card.Content>
                    <ProjectForm project={project} setEditing={setEditing}/>
                    <Icon name="cancel" onClick={() => setEditing(false)}/> 
                </Card.Content> 
                :
                // Edit card
                <Card.Content>
                    <Card.Header>{project.name}</Card.Header>
                    <Card.Meta>
                        <p>{project.project_date}</p>
                        Completed? {project.completed ? "Yes" : "No"}
                        <Button size="mini" icon="edit" onClick={() => setEditing(true)}/>
                    </Card.Meta>
                </Card.Content> 
            }
            <Button icon="trash" color="red" inverted onClick={handleDelete}/>
        </Card>
    )
}

export default ProjectCard