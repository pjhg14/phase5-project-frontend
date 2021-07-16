import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Form, Button, Rating, Message } from "semantic-ui-react";
import { businessURL } from "../../../../utility/Links";

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

    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!!id) {
            fetch(`${businessURL}/${id}`, {
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

    const errorList = errors.map(error => {
        return(
            <Message.Item key={error}>
                {error}
            </Message.Item>
        )
    })

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

        fetch(businessURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newBusiness),
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                    setErrors(json.errors)
                } else {
                    console.log(json.message)
                    history.push(`/feed/businesses`)
                }
            })
    }

    function edit(editedBusiness) {
        fetch(`${businessURL}/${id}`, {
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
                    setErrors(json.errors)
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
            <Form className="main-form" onSubmit={handleFormSubmit} error={errors.length > 0}>
                <Form.Input 
                    placeholder="ex: Robinson-Hayfield Labs"
                    label="Business Name"
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
                <Form.Input 
                    placeholder="ex: 2121 Example street"
                    label="Address"
                    type="text" 
                    value={address} 
                    onChange={e => setAddress(e.target.value)}
                />
                <Form.Input 
                    placeholder="Recreational Facilities and Services, Commercial Real Estate, etc."
                    label="Field"
                    type="text" 
                    value={field} 
                    onChange={e => setField(e.target.value)}
                />
                <Form.Input 
                    placeholder="ex: Intuitive system-worthy monitoring"
                    label="Motto"
                    type="text" 
                    value={motto} 
                    onChange={e => setMotto(e.target.value)}
                    />
                    <label>
                        <strong>Priority</strong>
                    </label>
                    <br/>
                    <Rating 
                        maxRating={5} 
                        value={priority} 
                        onRate={(e, {rating}) => setPriority(rating)}
                    />
                                    
                    <br/>
                    <br/>

                    <Form.TextArea 
                        placeholder="Short description of business"
                        label="Description"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />

                <Button type="submit">Submit</Button>
                <Message error>
                    <Message.Header>Header</Message.Header>
                    <Message.List>
                        {errorList}
                    </Message.List>
                </Message>
            </Form>
        </div>
    )
}

export default BusinessForm