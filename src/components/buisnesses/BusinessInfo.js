import { useEffect, useState } from "react"
import { Link, useParams, useRouteMatch } from "react-router-dom"

function BusinessInfo() {
    const { url } = useRouteMatch()
    const { id } = useParams()
    const [business, setBusiness] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const fixedPath = url.split("/").slice(0,3).join("/")

    useEffect(() => {
        fetch(`http://localhost:3000/businesses/${id}`)
            .then((resp) => resp.json())
            .then(queriedBusinesses => {
                setBusiness(queriedBusinesses)
                setLoaded(true)
            })
    },[id])

    if (!loaded) return <h1>Loading...</h1>

    function handleDelete() {
        fetch(`http://localhost:3000/businesses/${id}`, {
            method: "DELETE",
        })
            .then((resp) => resp.json())
            .then(() => {
                // handle delete on frontend
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
            <p>TODO</p>
            <h4>Edit Business</h4>
            <Link to={`${fixedPath}/edit/${id}`}>edit</Link>

            <h4>Delete Business</h4>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default BusinessInfo