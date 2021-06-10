import { Link, useRouteMatch } from "react-router-dom"

function BusinessList() {
    const { url } = useRouteMatch()

    return(
        <div>
            <h3>Business List:</h3>
            <Link to={`${url}/info/1`}>Business</Link>

            <h4>New Business</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default BusinessList