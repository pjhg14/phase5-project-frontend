import { Card, Button } from 'semantic-ui-react'
import ExperienceModal from '../modals/ExperienceModal'

function ExperienceCard({ experience }) {

    function handleDelete(event) {
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
        <Card link>
            <Card.Content>
                <Card.Header>{experience.title}</Card.Header>
                <Card.Meta>{experience.exp_type}</Card.Meta>
            </Card.Content>
            <Button.Group>
                <ExperienceModal experience={experience}/>
                <Button icon="trash" color="red" inverted onClick={handleDelete}/>
            </Button.Group>
        </Card>
    )
}

export default ExperienceCard