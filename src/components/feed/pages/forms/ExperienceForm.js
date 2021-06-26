import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, TextArea } from 'semantic-ui-react'

function ExperienceForm({ experience, open}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        if (experience) {
            setTitle(experience.title)
            setType(experience.exp_type)
            setDescription(experience.description)
            setDate(experience.completion_date)
        }
    },[experience])

    function handleFormSubmit(event) {
        event.preventDefault()

        const payload = {
            user_id: user.id,
            title: title,
            exp_type: type,
            description: description,
            completion_date: date
        }

        if (experience) {
            handleExpEdit(payload)
        } else {
            handleExpAdd(payload)
        }
    }

    function handleExpAdd(newExperience) {
        fetch(`http://localhost:3000/experiences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newExperience)
        })
            .then(resp => resp.json())
            .then(addedExperience => {
                if (addedExperience.error) {
                    console.log(addedExperience.details)
                } else {
                    console.log(addedExperience)
                    dispatch({type: "addExperience", payload: addedExperience})
                    open(false)
                }
            })
    }

    function handleExpEdit(editedExperience) {
        fetch(`http://localhost:3000/experiences/${experience.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedExperience)
        })
            .then(resp => resp.json())
            .then(updatedExperience => {
                if (updatedExperience.error) {
                    console.log(updatedExperience.details)
                } else {
                    console.log(updatedExperience)
                    dispatch({type: "editExperience", payload: updatedExperience})
                    open(false)
                }
            })
    }

    return(
        <Form onSubmit={handleFormSubmit}>
            <Form.Input 
                type="text" 
                icon="user" 
                iconPosition="left" 
                placeholder="Title" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Input 
                type="text"
                icon="certificate" 
                iconPosition="left" 
                placeholder="Experience Type" 
                value={type} 
                onChange={e => setType(e.target.value)}
            />
            <TextArea 
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}/>
            <label>Completion Date:</label>
            <Form.Input
                type="date"
                value={date} 
                onChange={e => setDate(e.target.value)}
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ExperienceForm