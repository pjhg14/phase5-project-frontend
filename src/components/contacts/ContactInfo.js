import { Link } from "react-router-dom"

function ContactInfo() {
    return(
        <div>
            <h3>Contact:</h3>
            <p>info</p>
            <h4>Edit Contact</h4>
            <Link to="/contacts/edit/1">edit</Link>
        </div>
    )
}

export default ContactInfo