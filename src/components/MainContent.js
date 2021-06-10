import { Route, Switch } from "react-router-dom";
import ApplicationPage from "./applications/ApplicationPage";
import BusinessPage from "./buisnesses/BusinessPage";
import ContactPage from "./contacts/ContactPage";
import Dashboard from "./Dashboard";
import Portal from "./users/Portal";
import Profile from "./users/Profile";

function MainContent() {
    return(
        <div>
            <Switch>
                {/* User Portal route */}
                <Route exact path="/">
                    <Portal />
                </Route>
                {/* User profile route */}
                <Route path="/profile">
                    <Profile />
                </Route>
                {/* Dashboard route */}
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                {/* Application route */}
                <Route path="/applications">
                    <ApplicationPage />
                </Route>
                {/* Business route */}
                <Route path="/businesses">
                    <BusinessPage />
                </Route>
                {/* Contact route */}
                <Route path="/contacts">
                    <ContactPage />
                </Route>
            </Switch>
        </div>
    )
}

export default MainContent