import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ApplicationForm() {
    const { id } = useParams()
    const [applyDate, setApplyDate] = useState("")
    const [startDate, setStartDate] = useState("")
    const [wageType, setWageType] = useState("")
    const [wage, setWage] = useState("")
    const [businesses, setBuisnesses] = useState([])
    const [businessPicker, setBusinessPicker] = useState("")
    const [contacts, setContacts] = useState([])
    

    useEffect(() => {
        fetch("http://localhost:3000/businesses")
            .then((resp) => resp.json())
            .then(queriedBusinesses => {
                setBuisnesses(queriedBusinesses)
            })
        
        fetch("http://localhost:3000/contacts")
            .then((resp) => resp.json())
            .then(queriedContacts => {
                setContacts(queriedContacts)
            })
    },[])

    const businessOptions = businesses.map(business => {
        return(
            <option key={business.id} value={business.id}>{business.name}</option>
        )
    })

    const contactOptions = contacts.map(contact => {
        return(
            <option key={contact.id} value={contact.id}>{contact.name}</option>
        )
    })

    function handleFormSubmit(event) {
        event.preventDefault()

        // Create Application in backend
        const newApplication = {
            apply_date: applyDate,
            start_date: startDate,
            wage_type: wageType,
            wage: wage,
            business_id: businessPicker
        }

        fetch("http://localhost:3000/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newApplication),
        })
            .then((resp) => resp.json())
            .then(addedApplication => {
                // add new application to user
            })
    }

    return(
        <div>
            <h2>{!id ? "Create" : "Edit"} Application</h2>
            <h3>Application Form</h3>
            <form onSubmit={handleFormSubmit}>
                <label>Application Date:</label>
                <input type="date" value={applyDate} onChange={e => setApplyDate(e.target.value)}/>
                <label>Job Start Date:</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                <label>Wage Type:</label>
                <input type="text" value={wageType} onChange={e => setWageType(e.target.value)}/>
                <label>Wage:</label>
                <input type="number" value={wage} onChange={e => setWage(e.target.value)}/>
                <label>Businesses:</label>
                <select value={businessPicker} onChange={e => setBusinessPicker(e.target.value)}>
                    {businessOptions}
                </select>
            </form>
            
            <h3>Business Form (optional)(TODO)</h3>

        </div>
    )
}

export default ApplicationForm