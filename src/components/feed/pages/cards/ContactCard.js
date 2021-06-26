import { useHistory } from "react-router-dom";
import { Card } from "semantic-ui-react";

function ContactCard({ contact }) {
    const history = useHistory()

    return(
        <Card link onClick={() => history.push(`/feed/contacts/info/${contact.id}`)}>
            <Card.Content>
                <Card.Header>{contact.full_name}</Card.Header>
                <Card.Meta>{contact.email}</Card.Meta>
            </Card.Content>
        </Card>
    )
}

export default ContactCard