import { useState } from "react"
import { useHistory } from "react-router";
import { useParams, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function Portal() {
    const { type } = useParams()
    const lsToggle = type === "login"
    // const [lsToggle, setLsToggle] = useState(type === "login")
    const [errors, setErrors] = useState([])

    const history = useHistory()

    function submitCrdentials(credentials, type) {
        fetch(`http://localhost:3000/users/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((resp) => resp.json())
            .then(message => {
                if (message.error) {
                    // show error in p tag
                    setErrors(message.details)
                } else {
                    localStorage.token = message.token
                    // console.log(message)
                    history.push("/feed/dashboard")
                }
                
            })
    }

    // console.log(errors)
    const errorText = errors.map(error => {
        return(
            <p key={error}>
                {error}
            </p>
        )
    })

    return(
        <div>
            <h3>{lsToggle ? "Login" : "Sign Up"}</h3>
            {lsToggle ? 
                <Login login={submitCrdentials}/>
                : 
                <SignUp signup={submitCrdentials}/>
            }
            {/* <button onClick={() => setLsToggle(!lsToggle)}>{lsToggle ? "Sign Up" : "Login" }</button> */}
            <Link to="/">Back</Link>
            {errorText}
        </div>
    )
}

export default Portal