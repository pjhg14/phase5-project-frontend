import { Link } from "react-router-dom";

function LandingPage(params) {
    return(
        <div>
            <h1>Welcome!</h1>
            <Link to="/portal/login">Login</Link>
            <p>-or-</p>
            <Link to="/portal/signup">Sign Up</Link>
        </div>
    )
}

export default LandingPage