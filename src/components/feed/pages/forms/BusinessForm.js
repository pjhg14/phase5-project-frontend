import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

function BusinessForm() {
    const { id } = useParams()
    const user = useSelector(state => state.user)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [field, setField] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (!!id) {
            fetch(`http://localhost:3000/businesses/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedBusiness => {
                    setName(queriedBusiness.name)
                    setAddress(queriedBusiness.address)
                    setField(queriedBusiness.field)
                    setDescription(queriedBusiness.description)
                })
        }
    },[id])

    function handleFormSubmit(event) {
        event.preventDefault()

        const payload = {
            name: name,
            address: address,
            field: field,
            description: description,
            user_id: user.id
        }

        if (!id) {
            add(payload)
        } else {
            edit(payload)
        }
    }

    function add(newBusiness) {
        // Create Business in backend

        fetch("http://localhost:3000/businesses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newBusiness),
        })
            .then((resp) => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                    // console.log(json)
                }
            })
    }

    function edit(editedBusiness) {
        fetch(`http://localhost:3000/businesses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedBusiness),
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                    // console.log(json)
                }
            })
    }

    return(
        <div>
            <h2>{!id ? "Add" : "Edit"} Business</h2>
            <h3>Business Form</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Business Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <label>Address:</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                <label>Field:</label>
                <input type="text" value={field} onChange={e => setField(e.target.value)}/>
                <label>Description:</label>
                <textarea type="text" value={description} onChange={e => setDescription(e.target.value)}/>

                <input type="submit"/>
            </form>
        </div>
    )
}

export default BusinessForm