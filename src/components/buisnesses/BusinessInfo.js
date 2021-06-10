import { Link } from "react-router-dom"

function BusinessInfo() {
    return(
        <div>
            <h3>Business:</h3>
            <p>info</p>
            <h4>Edit Business</h4>
            <Link to="/businesses/edit/1">edit</Link>
        </div>
    )
}

export default BusinessInfo