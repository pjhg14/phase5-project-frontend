import { Link, useRouteMatch } from "react-router-dom"

function BusinessList() {
    const { url } = useRouteMatch()
    const user = {}

    if (user.get.error) return <h1>Please log in</h1>

    const businesses = user.get.applications.map(application => {
        return application.business
    })
    
    let addedBusinesses = []
    const filteredBusinesses = businesses.filter(business => {
        if (!addedBusinesses.find((filterBusiness) => business.name === filterBusiness.name)) {
            addedBusinesses.push(business)
            return true
        } 

        return false
    })

    const businessList = filteredBusinesses.map(business => {
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