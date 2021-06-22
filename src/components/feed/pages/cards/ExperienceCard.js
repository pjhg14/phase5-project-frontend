import { Icon } from 'semantic-ui-react'

function ExperienceCard({ experience }) {

    return(
        <div id="card" key={experience.id}>
            <p>{experience.title}</p>
            <p>{experience.exp_type}</p>
            <p>{experience.description}</p>
            {/* add editing modal to edit icon */}
            <Icon name="edit"/>
        </div>
    )
}

export default ExperienceCard