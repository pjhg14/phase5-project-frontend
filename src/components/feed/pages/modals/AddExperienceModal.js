import { useState } from "react"
import { Modal, Button } from 'semantic-ui-react'
import ExperienceForm from "../forms/ExperienceForm"

function AddExperienceModal() {
    const [open, setOpen] = useState(false)

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add Experience</Button>}
        >   
            <Modal.Header>Add Experience</Modal.Header>
            <Modal.Content>
                <ExperienceForm open={setOpen}/>
            </Modal.Content>
        </Modal>
    )
}

export default AddExperienceModal