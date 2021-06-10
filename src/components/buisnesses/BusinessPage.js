import { Route, Switch, useRouteMatch } from "react-router-dom"
import BusinessForm from "./BusinessForm"
import BusinessInfo from "./BusinessInfo"
import BusinessList from "./BusinessList"

function BusinessPage() {
    const { path } = useRouteMatch()

    return(
        <Switch>
            <Route exact path={path}>
                <BusinessList />
            </Route>
            <Route path={`${path}/info/:id`}>
                <BusinessInfo />
            </Route>
            <Route path={`${path}/add`}>
                <BusinessForm />
            </Route>
            <Route path={`${path}/edit/:id`}>
                <BusinessForm />
            </Route>
        </Switch>
    )
}

export default BusinessPage