import { Link, useRouteMatch } from "react-router-dom";

function ApplicationList() {
    const { url } = useRouteMatch()

    return(
        <div>
            <h3>Application List:</h3>
            <Link to={`${url}/info/1`}>Application</Link>
            
            <h4>New Application</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ApplicationList