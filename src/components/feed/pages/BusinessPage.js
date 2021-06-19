import { Route, Switch, useRouteMatch } from "react-router-dom"
import BusinessForm from "./forms/BusinessForm"
import BusinessInfo from "./info/BusinessInfo"
import BusinessList from "./lists/BusinessList"

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