import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

function ContactForm() {
    const { id } = useParams()
    const user = useSelector(state => state.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [suffix, setSuffix] = useState("")
    const [email, setEmail] = useState("")
    const [profileURL, setProfileURL] = useState("")
    const [applications, setApplications] = useState([])
    const [applicationPicker, setApplicationPicker] = useState("")

    useEffect(() => {
        if (!!id) {
            fetch(`http://localhost:3000/contacts/${id}`, {
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
        fetch(`http://localhost:3000/applications/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedApplications => setApplications(queriedApplications))
    },[id])

    const applicationOptions = applications.map(application => {
        // TODO: change business name to alias once implemented
        return(
            <option key={application.id} value={application.id}>{application.business.name}</option>
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

        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newContact),
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

    function edit(editedContact) {
        fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedContact),
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
            <h2>{!id ? "Add" : "Edit"} Contact</h2>
            <h3>Contact Form</h3>
            <form onSubmit={handleFormSubmit}>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                <label>Suffix:</label>
                <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)}/>
                <label>Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <label>Profile:</label>
                <input type="text" value={profileURL} onChange={e => setProfileURL(e.target.value)}/>
                {!id && 
                    <select value={applicationPicker} onChange={e => setApplicationPicker(e.target.value)}>
                        <option value="">Please Select an Application</option>
                        {applicationOptions}
                    </select>
                }
                

                <input type="submit"/>
            </form>
        </div>
    )
}

export default ContactForm