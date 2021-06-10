import { Link } from "react-router-dom";

function ApplicationInfo() {
    return(
        <div>
            <h3>Application:</h3>
            <p>info</p>
            <h4>Edit Application</h4>
            <Link to="/applications/edit/1">edit</Link>
        </div>
    )
}

export default ApplicationInfo