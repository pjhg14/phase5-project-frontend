import { Route, Switch, useRouteMatch } from "react-router"
import ContactForm from "./forms/ContactForm"
import ContactInfo from "./info/ContactInfo"
import ContactList from "./lists/ContactList"

function ContactPage() {
    const { path } = useRouteMatch()

    return(
        <Switch>
            <Route exact path={path}>
                <ContactList />
            </Route>
            <Route path={`${path}/info/:id`}>
                <ContactInfo />
            </Route>
            <Route path={`${path}/add`}>
                <ContactForm />
            </Route>
            <Route path={`${path}/edit/:id`}>
                <ContactForm />
            </Route>
        </Switch>
    )
}

export default ContactPage