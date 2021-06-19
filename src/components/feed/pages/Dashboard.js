import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const [applications, setApplications] = useState([])
    const [businesses, setBusinesses] = useState([])
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/user/dashboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then((resp) => resp.json())
            .then(queriedModels => {
                setApplications(queriedModels.applications)
                setBusinesses(queriedModels.businesses)
                setContacts(queriedModels.contacts)

                // setLoaded(true)
            })
    },[])

    const applicationList = applications.map(application => {
        return(
            <div id="card" key={application.id}>
                {/* <p>application to: {application.business.name}</p> */}
                <p>apply date: {application.apply_date}</p>
                <p>{application.wage_type === "Salary" ? "Salary" : "Hourly wage"}: ${application.wage}</p>
                <Link to={`/feed/applications/info/${application.id}`}>Info</Link>
            </div>
        )
    })

    const businessList = businesses.map(business => {
        return(
            <div id="card" key={business.id}>
                <p>{business.name}</p>
                <p>address: {business.address}</p>
                <p>priority: </p>
                <Link to={`/feed/businesses/info/${business.id}`}>Info</Link>
            </div>
        )
    })

    const contactList = contacts.map(contact => {
        return(
            <div id="card" key={contact.id}>
                <p>{contact.full_name}</p>
                <p>{contact.email}</p>
                <Link to={`/feed/contacts/info/${contact.id}`}>Info</Link>
            </div>
        )
    })

    return(
        <div>
            <h3>Top Applications</h3>
            {applicationList}
            <h3>Top Businesses</h3>
            {businessList}
            <h3>Top Contacts</h3>
            {contactList}
        </div>
    )
}

export default Dashboard