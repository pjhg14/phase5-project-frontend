import { useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react";

function Navigation() {
    const history = useHistory()
    
    return(
        <Button.Group >
            <Button onClick={() => history.push("/")}>Logout</Button>
            <Button onClick={() => history.push("/feed/dashboard")}>Dashboard</Button>
            <Button onClick={() => history.push("/feed/profile")}>Profile</Button>
            <Button onClick={() => history.push("/feed/applications")}>Applications</Button>
            <Button onClick={() => history.push("/feed/businesses")}>Buisnesses</Button>
            <Button onClick={() => history.push("/feed/contacts")}>Contacts</Button>
            <Button onClick={() => history.push("/feed/calendar")}>Calendar</Button>
        </Button.Group>
    )
}

export default Navigation