import { Card } from 'semantic-ui-react'
import ExperienceModal from '../modals/ExperienceModal'

function ExperienceCard({ experience }) {
    return(
        <Card >
            <Card.Content>
                <Card.Header>{experience.title}</Card.Header>
                <Card.Meta>{experience.exp_type}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <ExperienceModal experience={experience}/>
            </Card.Content>
        </Card>
    )
}

export default ExperienceCard