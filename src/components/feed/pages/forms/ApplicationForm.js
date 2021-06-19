import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function ApplicationForm() {
    const { id } = useParams()
    const user = useSelector(state => state.user)

    // form state
    const [applyDate, setApplyDate] = useState("")
    const [startDate, setStartDate] = useState("")
    const [wageType, setWageType] = useState("")
    const [wage, setWage] = useState("")
    const [businesses, setBuisnesses] = useState([])
    const [businessPicker, setBusinessPicker] = useState("")
    

    useEffect(() => {
        if (!!id) {
            // prepare form with application information
            fetch(`http://localhost:3000/applications/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then((resp) => resp.json())
                .then(queriedApplication => {
                    setApplyDate(queriedApplication.apply_date)
                    setStartDate(queriedApplication.start_date)
                    setWageType(queriedApplication.wage_type)
                    setWage(queriedApplication.wage)
                    setBusinessPicker(queriedApplication.business_id)
                })
        }
        fetch(`http://localhost:3000/businesses/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedBusinesses => setBuisnesses(queriedBusinesses))
    },[id])

    const businessOptions = businesses.map(business => {
        return(
            <option key={business.id} value={business.id}>{business.name}</option>
        )
    })

    function handleFormSubmit(event) {
        event.preventDefault()

        const payload = {
            apply_date: applyDate,
            start_date: startDate,
            wage_type: wageType,
            wage: wage,
            user_id: user.id,
            business_id: businessPicker
        }

        if (!id) {
            add(payload)
        } else {
            edit(payload)
        }
    }

    function add(newApplication) {
        // Create Application in backend

        fetch("http://localhost:3000/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newApplication),
            Authorization: `Bearer ${localStorage.token}`
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                }
            })
    }

    function edit(editedApplication) {
        fetch(`http://localhost:3000/applications/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedApplication),
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                } else {
                    console.log(json.message)
                }
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

                <input type="submit"/>
            </form>
            
            <h3>Business Form (optional)(TODO)</h3>

        </div>
    )
}

export default ApplicationForm