import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {
    const applications = useSelector(state => state.applicationReducer.applications)

    const applicationList = applications.map(application => {
        return(
            <div id="card" key={application.id}>
                <p>application to: {application.business.name}</p>
                <p>apply date: {application.apply_date}</p>
                <p>{application.wage_type === "Salary" ? "Salary" : "Hourly wage"}: ${application.wage}</p>
                <Link to={`/feed/applications/info/${application.id}`}>Info</Link>
            </div>
        )
    })
    
    const businesses = applications.map(application => {
        return application.business
    })
    
    let addedBusinesses = []
    const filteredBusinesses = businesses.filter(business => {
        if (!addedBusinesses.find((filterBusiness) => business.name === filterBusiness.name)) {
            addedBusinesses.push(business)
            return true
        } 

        return false
    })

    const businessList = filteredBusinesses.map(business => {
        return(
            <div id="card" key={business.id}>
                <p>{business.name}</p>
                <p>address: {business.address}</p>
                <p>priority: </p>
                <Link to={`/feed/businesses/info/${business.id}`}>Info</Link>
            </div>
        )
    })

    const contacts = applications.map(application => {
        return application.contacts
    }).flat()

    const contactList = contacts.map(contact => {
        return(
            <div id="card" key={contact.id}>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <Link to={`/feed/contacts/info/${contact.id}`}>Info</Link>
            </div>
        )
    })

    console.log(filteredBusinesses)    

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