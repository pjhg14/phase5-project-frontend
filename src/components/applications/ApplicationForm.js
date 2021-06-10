import { useParams } from "react-router";

function ApplicationForm() {
    const { id } = useParams()

    return(
        <div>
            <h2>{!id ? "Create" : "Edit"} Application</h2>
            <h3>Application Form</h3>
            <h3>Business Form (optional)</h3>
            <h3>Contact Form</h3>
        </div>
    )
}

export default ApplicationForm