import { useEffect, useState } from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom"

function BusinessInfo() {
    const { url } = useRouteMatch()
    const { id } = useParams()
    const [business, setBusiness] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`http://localhost:3000/businesses/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedBusiness => {
                setBusiness(queriedBusiness)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading...</h1>

    const applicationList = business.applications.map(application => {
        return(
            <div id="card" key={application.id}>
                {/* <p>application to: {application.business.name}</p> */}
                <p>apply date: {application.apply_date}</p>
                <p>{application.wage_type === "Salary" ? "Salary" : "Hourly wage"}: ${application.wage}</p>
                <Link to={`/feed/applications/info/${application.id}`}>Info</Link>
            </div>
        )
    })

    function handleDelete() {
        fetch(`http://localhost:3000/businesses/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                }
            });
    }

    return(
        <div>
            <h3>Business:</h3>
            <p>Name: {business.name}</p>
            <p>address: {business.address}</p>
            <p>Field of work: {business.field}</p>
            <p>Description: {business.description}</p>

            <h4>Applications:</h4>
            
            { applicationList }
            <h4>Edit Business</h4>
            <Link to={`${fixedPath}/edit/${id}`}>edit</Link>

            <h4>Delete Business</h4>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default BusinessInfo