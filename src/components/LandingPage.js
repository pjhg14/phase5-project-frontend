import { useHistory } from "react-router-dom";
import { Button, Grid } from 'semantic-ui-react'

function LandingPage(params) {
    const history = useHistory()

    // TODO: set all style tags to external css
    return(
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '70vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <h1 style={{fontSize: '4em'}} className="welcome-text">Welcome!</h1>
                <Button className="landing-button" onClick={() => history.push("/portal/login")}>Login</Button>
                <div className="button-divider">-or-</div>
                <Button className="landing-button" onClick={() => history.push("/portal/signup")}>Sign Up</Button>
            </Grid.Column>
        </Grid>
    )
}

export default LandingPage