import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Form, Button, Message, Grid, Rating } from "semantic-ui-react";
import { applicationURL, businessURL } from "../../../../utility/Links";

function ApplicationForm() {
    const { id } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.user)

    // form state
    const [alias, setAlias] = useState("")
    const [role, setRole] = useState("")
    const [applyDate, setApplyDate] = useState("")
    const [startDate, setStartDate] = useState("")
    const [wageType, setWageType] = useState("")
    const [wage, setWage] = useState("")
    const [businesses, setBuisnesses] = useState([])
    const [businessPicker, setBusinessPicker] = useState("")

    // business form state
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [field, setField] = useState("")
    const [motto, setMotto] = useState("")
    const [priority, setPriority] = useState("")
    const [description, setDescription] = useState("")

    // function state
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!!id) {
            // prepare form with application information
            fetch(`${applicationURL}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
                .then(resp => resp.json())
                .then(queriedApplication => {
                    setAlias(queriedApplication.alias)
                    setRole(queriedApplication.role)
                    setApplyDate(queriedApplication.apply_date)
                    setStartDate(queriedApplication.start_date)
                    setWageType(queriedApplication.wage_type)
                    setWage(queriedApplication.wage)
                    setBusinessPicker(queriedApplication.business_id)
                })
        }

        fetch(`${businessURL}/user/index`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedBusinesses => {
                // console.log(queriedBusinesses)
                if (queriedBusinesses.error) {
                    console.log("Oops, no businesses")
                } else {
                    setBuisnesses(queriedBusinesses)
                    setLoaded(true)
                }
            })
    },[id])

    // Semantic form
    const businessOptions = [
        {
            text: "Please select a business",
            value: "none"
        },
        {
            text: "Add a business",
            value: "create"
        },
        ...businesses.map(business => {
            return(
                {
                    text: business.name,
                    value: business.id
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

        if (businessPicker !== "none") {
            let payload

            if (businessPicker !== "create") {
                payload = {
                    alias: alias,
                    role: role,
                    apply_date: applyDate,
                    start_date: startDate,
                    wage_type: wageType,
                    wage: wage,
                    user_id: user.id,
                    business_id: businessPicker
                }
            } else {
                payload = {
                    alias: alias,
                    role: role,
                    apply_date: applyDate,
                    start_date: startDate,
                    wage_type: wageType,
                    wage: wage,
                    user_id: user.id,
                    business: {
                        name: name,
                        address: address,
                        field: field,
                        motto: motto,
                        priority: priority,
                        description: description
                    }
                }
            }
    
            if (!id) {
                add(payload)
            } else {
                edit(payload)
            }

        } else {
            setErrors(["Must have a business selected"])
        }
    }

    function add(newApplication) {
        fetch(applicationURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newApplication),
        })
            .then(resp => resp.json())
            .then(json => {
                // stuff
                if (json.error) {
                    console.log(json.details)
                    setErrors(json.details)
                } else {
                    console.log(json.message)
                    history.push(`/feed/applications`)
                }
            })
    }

    function edit(editedApplication) {
        fetch(`${applicationURL}/${id}`, {
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
                    setErrors(json.details)
                } else {
                    console.log(json.message)
                    history.push(`/feed/applications/info/${id}`)
                }
            })
    }

    // console.log(priority)

    return(
        <div>
            <h2>{!id ? "Create" : "Edit"} Application</h2>
            <h3>Application Form</h3>
            <Form className="main-form" onSubmit={handleFormSubmit} error={errors.length > 0}>
                <Grid columns={businessPicker === "create" ? 2 : 1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                placeholder="ex: [role] oppertunity at [business name]"
                                label="Application Alias"
                                type="text"
                                value={alias}
                                onChange={e => setAlias(e.target.value)}
                            />
                            <Form.Input
                                placeholder="ex: Engineer, Agriculturist, Economist, etc."
                                label="Role"
                                type="text" 
                                value={role} 
                                onChange={e => setRole(e.target.value)}
                            />
                            <Form.Input 
                                label="Apply Date"
                                type="date" 
                                value={applyDate} 
                                onChange={e => setApplyDate(e.target.value)}
                            />
                            <Form.Input 
                                label="Expected Start Date"
                                type="date" 
                                value={startDate} 
                                onChange={e => setStartDate(e.target.value)}
                            />
                            <Form.Input 
                                placeholder="ex: Salary, Hourly"
                                label="Wage Type"
                                type="text" 
                                value={wageType} 
                                onChange={e => setWageType(e.target.value)}
                            />
                            <Form.Input 
                                placeholder="90000, 78000, 28.50, 32.00"
                                label="Wage"
                                type="number" 
                                value={wage} 
                                onChange={e => setWage(e.target.value)}
                            />
                            <Form.Select 
                                loading={!loaded}
                                disabled={!loaded || id}
                                placeholder="Please Select a Business"
                                label="Businesses"
                                options={businessOptions}
                                value={businessPicker}
                                onChange={(e, {name, value}) => setBusinessPicker(value)}
                            />
                        </Grid.Column>

                        {businessPicker === "create" &&
                            <Grid.Column>
                                <h3>Business:</h3>
                                <Form>
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
                                </Form>
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>

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

export default ApplicationForm