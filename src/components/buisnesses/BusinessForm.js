import { useParams } from "react-router"

function BusinessForm() {
    const { id } = useParams()

    return(
        <div>
            <h2>{!id ? "Add" : "Edit"} Business</h2>
            <h3>Business Form</h3>
        </div>
    )
}

export default BusinessForm