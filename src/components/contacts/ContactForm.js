import { useParams } from "react-router"

function ContactForm() {
    const { id } = useParams()

    return(
        <div>
            <h2>{!id ? "Add" : "Edit"} Contact</h2>
            <h3>Contact Form</h3>
        </div>
    )
}

export default ContactForm