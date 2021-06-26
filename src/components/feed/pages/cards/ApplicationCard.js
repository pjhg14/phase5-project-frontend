import { Card } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function ApplicationCard({ application }) {
    const history = useHistory()

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    return(
        <Card link onClick={() => history.push(`/feed/applications/info/${application.id}`)}>
            <Card.Content>
                <Card.Header>{application.alias}</Card.Header>
                <Card.Meta>apply date: {application.apply_date}</Card.Meta>
                <Card.Description>
                    {application.wage_type === "Salary" ? "Salary" : "Hourly wage"}: ${numberWithCommas(application.wage)}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ApplicationCard