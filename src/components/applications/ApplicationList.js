import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

function ApplicationList() {
    const { url } = useRouteMatch()
    // const user = useContext(UserContext)
    const applications = useSelector(state => state.applicationReducer.applications)

    const applicationList = applications.map(application => {
        return(
            <div id="card" key={application.id}>
                <p>application to: {application.business.name}</p>
                <p>apply date: {application.apply_date}</p>
                <p>{application.wage_type === "Salary" ? "Salary" : "Hourly wage"}: ${application.wage}</p>
                <Link to={`/feed/applications/info/${application.id}`}>Info</Link>
            </div>
        )
    })

    return(
        <div>
            <h3>Application List:</h3>
            {applicationList}
            
            <h4>New Application</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default ApplicationList