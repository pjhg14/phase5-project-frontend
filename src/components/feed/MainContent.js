import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import Header from "./Header";
import Navigation from "./Navigation";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplicationPage from "./pages/ApplicationPage";
import BusinessPage from "./pages/BusinessPage";
import ContactPage from "./pages/ContactPage";
import CalendarPage from "./pages/CalendarPage";
import { userURL } from "../../utility/Links";

function MainContent() {
    const { url } = useRouteMatch()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch(`${userURL}/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            }
        })
            .then(resp => resp.json())
            .then(queriedUser => {
                console.log(queriedUser)

                dispatch({type: "login", payload: queriedUser})

                setLoaded(true)
            })
    },[])

    if (!loaded) return <h1>loading...</h1>

    return(
            <div id="main-content">
                <Header />
                <Navigation />
                <Segment className="custom" attacted="bottom">
                    <Switch>
                        <Route path={`${url}/dashboard`}>
                            <Dashboard />
                        </Route>
                        <Route path={`${url}/profile`}>
                            <Profile />
                        </Route>
                        <Route path={`${url}/applications`}>
                            <ApplicationPage />
                        </Route>
                        <Route path={`${url}/businesses`}>
                            <BusinessPage />
                        </Route>
                        <Route path={`${url}/contacts`}>
                            <ContactPage />
                        </Route>
                        <Route path={`${url}/calendar`}>
                            <CalendarPage />
                        </Route>
                    </Switch>
                </Segment>
                
            </div>
    )
}

export default MainContent