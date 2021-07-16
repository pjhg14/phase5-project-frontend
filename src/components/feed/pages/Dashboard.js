import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import ApplicationCard from "./cards/ApplicationCard";
import BusinessCard from "./cards/BusinessCard";
import ContactCard from "./cards/ContactCard";

function Dashboard() {
    const [applications, setApplications] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        // TODO: change routes to enable standard user url
        fetch("http://localhost:3000/user/dashboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedModels => {
                setApplications(queriedModels.applications ? queriedModels.applications : [])
                setBusinesses(queriedModels.businesses ? queriedModels.businesses : [])
                setContacts(queriedModels.contacts ? queriedModels.contacts : [])
            })
    },[])

    const applicationList = applications.map(application => {
        return(
            <ApplicationCard application={application} key={application.id}/>
        )
    })

    const businessList = businesses.map(business => {
        return(
            <BusinessCard business={business} key={business.id}/>
        )
    })

    const contactList = contacts.map(contact => {
        return(
            <ContactCard contact={contact} key={contact.id}/>
        )
    })

    return(
        <div id="dashboard">
            <div id="db-app-section">
                <h3>Top Applications</h3>
                <Card.Group centered>    
                    {applicationList}
                </Card.Group>
            </div>
            
            <div id="db-bus-section">
                <h3>Top Businesses</h3>
                <Card.Group centered>
                    {businessList}
                </Card.Group>
            </div>
            
             <div id="db-cont-section">
                <h3>Top Contacts</h3>
                <Card.Group centered>
                    {contactList}
                </Card.Group>
             </div>
        </div>
    )
}

export default Dashboard