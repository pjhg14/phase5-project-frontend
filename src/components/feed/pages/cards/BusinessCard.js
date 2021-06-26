import { useHistory } from "react-router-dom";
import { Card, Rating } from "semantic-ui-react";

function BusinessCard({ business }) {
    const history = useHistory()

    return(
        <Card link onClick={() => {history.push(`/feed/businesses/info/${business.id}`)}}>
            <Card.Content>
                <Card.Header>{business.name}</Card.Header>
                <Card.Meta>
                    Priority:
                    <Rating defaultRating={business.priority} maxRating={5} disabled/>
                </Card.Meta>
                <Card.Description>Address: {business.address}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default BusinessCard