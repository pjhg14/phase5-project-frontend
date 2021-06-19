import { useEffect, useState } from "react"
import { Link, useRouteMatch } from "react-router-dom"

function BusinessList() {
    const { url } = useRouteMatch()
    const [businesses, setBusinesses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/businesses/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedBusinesses => setBusinesses(queriedBusinesses))
    },[])

    const businessList = businesses.map(business => {
        return(
            <div id="card" key={business.id}>
                <p>{business.name}</p>
                <p>address: {business.address}</p>
                <p>priority: </p>
                <Link to={`/feed/businesses/info/${business.id}`}>Info</Link>
            </div>
        )
    })

    return(
        <div>
            <h3>Business List:</h3>
            {businessList}

            <h4>New Business</h4>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default BusinessList