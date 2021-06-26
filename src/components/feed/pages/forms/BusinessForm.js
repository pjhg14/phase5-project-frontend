import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Form, Button } from "semantic-ui-react";

function BusinessForm() {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [field, setField] = useState("")
    const [motto, setMotto] = useState("")
    const [priority, setPriority] = useState("")
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
                    setMotto(queriedBusiness.motto)
                    setPriority(queriedBusiness.priority)
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
            motto: motto,
            priority: parseInt(priority),
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
                    history.push(`/feed/businesses`)
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
                    history.push(`/feed/businesses/info/${id}`)
                }
            })
    }

    return(
        <div>
            <h2>{!id ? "Add" : "Edit"} Business</h2>
            <h3>Business Form</h3>
            <Form onSubmit={handleFormSubmit}>
                <label>Business Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <label>Address:</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                <label>Field:</label>
                <input type="text" value={field} onChange={e => setField(e.target.value)}/>
                <label>Motto:</label>
                <input type="text" value={motto} onChange={e => setMotto(e.target.value)}/>
                <label>Priority:</label>
                <input type="number" value={priority} onChange={e => setPriority(e.target.value)}/>
                <label>Description:</label>
                <textarea type="text" value={description} onChange={e => setDescription(e.target.value)}/>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default BusinessForm