import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Form, Button, Message } from "semantic-ui-react";
import { applicationURL, contactURL } from "../../../../utility/Links";

function ContactForm() {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [suffix, setSuffix] = useState("")
    const [email, setEmail] = useState("")
    const [profileURL, setProfileURL] = useState("")
    const [applications, setApplications] = useState([])
    const [applicationPicker, setApplicationPicker] = useState("")

    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!!id) {
            fetch(`${contactURL}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedContact => {
                    const name = queriedContact.full_name.split(" ")
                    const first = name[0]
                    const last = name[1]
                    let suffix
                    name[2] ? suffix = name[2] : suffix = ""

                    setFirstName(first)
                    setLastName(last)
                    setSuffix(suffix)
                    setEmail(queriedContact.email)
                    setProfileURL(queriedContact.profile_url)
                    setApplicationPicker(queriedContact.application_id)
                })
        }
        fetch(`${applicationURL}/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedApplications => {
                setApplications(queriedApplications)
                setApplicationPicker(queriedApplications[0].id)
                setLoaded(true)
            })
    },[id])

    const applicationOptions = [
        {
            text: "Please select an application",
            value: "none"
        },
        ...applications.map(application => {
            return(
                {
                    text: application.alias,
                    value: application.id
                }
            )
        })
    ]

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
            first_name: firstName,
            last_name: lastName,
            suffix: suffix,
            email: email,
            profile_url: profileURL,
            user_id: user.id,
            application_id: applicationPicker
        }

        if (!id) {
            add(payload)
        } else {
            edit(payload)
        }
    }

    function add(newContact) {
        // Create Business in backend

        fetch(contactURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newContact),
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                    setErrors(json.details)
                } else {
                    console.log(json.message)
                    history.push(`/feed/contacts`)
                }
            })
    }

    function edit(editedContact) {
        fetch(`${contactURL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedContact),
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.error) {
                    console.log(json.details)
                    setErrors(json.details)
                } else {
                    console.log(json.message)
                    history.push(`/feed/contacts/info/${id}`)
                }
            })
    }

    return(
        <div>
            <h2>{!id ? "Add" : "Edit"} Contact</h2>
            <h3>Contact Form</h3>
            <Form className="main-form" onSubmit={handleFormSubmit} error={errors.length > 0}>
                <Form.Input
                    placeholder="Contact's First Name" 
                    label="First Name"
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                />

                <Form.Input 
                    placeholder="Contact's Last Name"
                    label="Last Name"
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                />

                <Form.Input 
                    placeholder="Contact's Suffix"
                    label="Suffix"
                    type="text" 
                    value={suffix} 
                    onChange={e => setSuffix(e.target.value)}
                />

                <Form.Input 
                    placeholder="Contact's Email Address"
                    label="Email"
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />

                <Form.Input 
                    placeholder="ex: personal or LinkedIn"
                    label="Site"
                    type="text" 
                    value={profileURL} 
                    onChange={e => setProfileURL(e.target.value)}
                />

                <Form.Select 
                    loading={!loaded}
                    disabled={!loaded || id}
                    placeholder="Please Select an Application"
                    label="Application"
                    options={applicationOptions}
                    value={applicationPicker}
                    onChange={(e, {name, value}) => setApplicationPicker(value)}
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

export default ContactForm