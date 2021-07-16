import { useEffect, useState } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { Card, Divider } from "semantic-ui-react";
import { businessURL } from "../../../../utility/Links";
import BusinessCard from "../cards/BusinessCard";

function BusinessList() {
    const { url } = useRouteMatch()
    const [businesses, setBusinesses] = useState([])

    useEffect(() => {
        fetch(`${businessURL}/user/index`, {
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
            <BusinessCard business={business} key={business.id}/>
        )
    })

    return(
        <div>
            <h3>Business List:</h3>
            <Card.Group centered>
                {businessList}
            </Card.Group>

            <Divider horizontal>New Business</Divider>
            <Link to={`${url}/add`}>Add</Link>
        </div>
    )
}

export default BusinessList