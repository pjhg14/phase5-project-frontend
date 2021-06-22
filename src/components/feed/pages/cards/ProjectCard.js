import { useState } from "react"
import { useDispatch } from "react-redux";
import { Icon } from 'semantic-ui-react'
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
        <div id="card">
            {editing ?
                // Non edit card
                <div>
                    <ProjectForm project={project} setEditing={setEditing}/>
                    <Icon name="cancel" onClick={() => setEditing(false)}/> 
                </div> 
                :
                // Edit card
                <div>
                    <p>{project.name}</p>
                    <p>{project.project_date}</p>
                    <p>Completed? {project.completed ? "Yes" : "No"}</p>
                    <Icon name="edit" onClick={() => setEditing(true)}/>
                </div> 
            }
            <Icon name="trash" onClick={handleDelete}/>
        </div>
    )
}

export default ProjectCard