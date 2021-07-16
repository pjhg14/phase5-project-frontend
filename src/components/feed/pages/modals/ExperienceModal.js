import { useState } from "react"
import { Modal, Button } from 'semantic-ui-react'
import ExperienceForm from "../forms/ExperienceForm"

function ExperienceModal({ experience }) {
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button icon="edit" />}
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
            </Modal.Actions>
        </Modal>
    )
}

export default ExperienceModal