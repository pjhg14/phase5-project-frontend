import { Route, Switch, useRouteMatch } from "react-router";
import ApplicationForm from "./forms/ApplicationForm";
import ApplicationInfo from "./info/ApplicationInfo";
import ApplicationList from "./lists/ApplicationList";

function ApplicationPage() {
    const { path } = useRouteMatch()

    return(
        <Switch>
            <Route exact path={path}>
                <ApplicationList />
            </Route>
            <Route path={`${path}/info/:id`}>
                <ApplicationInfo />
            </Route>
            <Route path={`${path}/add`}>
                <ApplicationForm />
            </Route>
            <Route path={`${path}/edit/:id`}>
                <ApplicationForm />
            </Route>
        </Switch>
    )
}

export default ApplicationPage