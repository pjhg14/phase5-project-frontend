import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Card, Divider } from "semantic-ui-react";
import ApplicationCard from "../cards/ApplicationCard";

function ApplicationList() {
    const { url } = useRouteMatch()
    const [applications, setApplications] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/applications/user/index", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedApplications => setApplications(queriedApplications))
    },[])

    const applicationList = applications.map(application => {
        return(
            <ApplicationCard application={application} key={application.id}/>
        )
    })

    return(
        <div>
            <h3>Application List:</h3>
            <Card.Group centered>
                {applicationList}
            </Card.Group>
            
            <Divider horizontal>New Application</Divider>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ApplicationList