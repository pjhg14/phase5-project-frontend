import { useState } from "react"
import { Modal, Icon, Button } from 'semantic-ui-react'
import ExperienceForm from "../forms/ExperienceForm"

function ExperienceModal({ experience }) {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    function handleExpDelete(event) {
        fetch(`http://localhost:3000/experience/${experience.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
            })
    }

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Icon name="edit"/>}
        >   
            <Modal.Header>{isEdit ? `${experience.title}` : `Edit Experience`}</Modal.Header>
            {isEdit ? 
            <Modal.Content>
                <ExperienceForm experience={experience} open={setOpen}/>
            </Modal.Content>
            :
            <Modal.Content>
                <Modal.Description>
                    <p>Type: {experience.exp_type}</p>
                    <p>Description: {experience.description}</p>
                    <p>Completion Date: {experience.completion_date}</p>
                </Modal.Description>
            </Modal.Content>
            }
            <Modal.Actions>
                <Button onClick={() => setIsEdit(!isEdit)}>{isEdit ? "Cancel" : "Edit"}</Button>
                <Button icon="trash" onClick={handleExpDelete}/>
            </Modal.Actions>
        </Modal>
    )
}

export default ExperienceModal