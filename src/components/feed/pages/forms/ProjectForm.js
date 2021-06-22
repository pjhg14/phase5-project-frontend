import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function ProjectForm({ project, setEditing }) {
    const user = useSelector(state => state.user)
    const addCardShowing = useSelector(state => state.new_project_showing)

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [projectDate, setProjectDate] = useState("")
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (project) {
            setName(project.name)
            setProjectDate(project.project_date)
            setCompleted(project.completed)
        }
    },[project])

    function handleFormSubmit(event) {
        event.preventDefault()

        const payload = {
            user_id: user.id,
            name: name,
            project_date: projectDate,
            completed: completed
        }

        if (addCardShowing) {
            handleProjectAdd(payload)
        } else {
            handleProjectEdit(payload)
        }
    }

    function handleProjectAdd(newProject) {
        fetch(`http://localhost:3000/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newProject)
        })
            .then(resp => resp.json())
            .then(addedProject => {
                if (addedProject.error) {
                    console.log(addedProject.details)
                } else {
                    dispatch({type: "addProject", payload: addedProject})
                }
            })
    }

    function handleProjectEdit(editedProject) {
        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedProject)
        })
            .then(resp => resp.json())
            .then(updatedProject => {
                if (updatedProject.error) {
                    console.log(updatedProject.details)
                } else {
                    dispatch({type: "editProject", payload: updatedProject})
                    setEditing(false)
                }
            })
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <label>Project Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <label>Date:</label>
            <input type="date" value={projectDate} onChange={e => setProjectDate(e.target.value)}/>
            <label>Completed?</label>
            <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)}/>      
            <input type="submit"/>
        </form>
    )
}

export default ProjectForm