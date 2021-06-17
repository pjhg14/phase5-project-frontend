import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import ApplicationPage from "../applications/ApplicationPage";
import BusinessPage from "../buisnesses/BusinessPage";
import ContactPage from "../contacts/ContactPage";
import Dashboard from "./Dashboard";
import Profile from "../users/Profile";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function MainContent() {
    const { url } = useRouteMatch()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/users/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then((resp) => resp.json())
            .then(queriedUser => {
                console.log(queriedUser)

                // set global vars
                dispatch({type: "login", payload: queriedUser})
                dispatch({type: "setApplications", payload: queriedUser.applications})

                setLoaded(true)
            })
    },[])

    if (!loaded) return <h1>loading...</h1>

    return(
            <div>
                <Header />
                <Navigation />
                <Switch>
                    {/* Dashboard route */}
                    <Route path={`${url}/dashboard`}>
                        <Dashboard />
                    </Route>
                    {/* User profile route */}
                    <Route path={`${url}/profile`}>
                        <Profile />
                    </Route>
                    {/* Application route */}
                    <Route path={`${url}/applications`}>
                        <ApplicationPage />
                    </Route>
                    {/* Business route */}
                    <Route path={`${url}/businesses`}>
                        <BusinessPage />
                    </Route>
                    {/* Contact route */}
                    <Route path={`${url}/contacts`}>
                        <ContactPage />
                    </Route>
                </Switch>
            </div>
    )
}

export default MainContent