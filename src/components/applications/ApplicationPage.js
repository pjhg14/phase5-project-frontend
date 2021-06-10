import { Route, Switch, useRouteMatch } from "react-router";
import ApplicationForm from "./ApplicationForm";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationList from "./ApplicationList";

function ApplicationPage() {
    const { path } = useRouteMatch()

    // console.log(path)

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