import { useState } from "react"
import { useHistory } from "react-router";
import { useParams, Link } from "react-router-dom";
import { Grid, Message } from 'semantic-ui-react'
import { userURL } from "../../utility/Links";
import Login from "./Login";
import SignUp from "./SignUp";

function Portal() {
    const { type } = useParams()
    const [errors, setErrors] = useState([])
    const history = useHistory()

    function submitCrdentials(credentials, type) {
        setErrors([])
        
        fetch(`${userURL}/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then(resp => resp.json())
            .then(message => {
                if (message.error) {
                    // show error in message
                    setErrors(message.details)  
                } else {
                    localStorage.token = message.token
                    // console.log(message)
                    history.push("/feed/dashboard")
                }
            })
    }

    function addError(error) {
        const uniqueErrors = [...errors, error].filter((value, index, self) => {
            return self.indexOf(value) === index;
        })
        setErrors(uniqueErrors)
    }

    const errorList = errors.map(error => {
        return(
            <Message.Item key={error}>
                {error}
            </Message.Item>
        )
    })

    return(
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '70vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
            <h3>
                {type === "login" ? 
                    "Login" 
                    : 
                    "Sign Up"
                }
            </h3>
            {type === "login" ? 
                <Login login={submitCrdentials}/>
                : 
                <SignUp signup={submitCrdentials} addError={addError}/>
            }
            <Link className="link" to="/">Back</Link>
            {errors.length > 0 && 
                <Message style={{textAlign: "left"}} error >
                    <Message.Header>Error</Message.Header>
                    <Message.List>
                        {errorList}
                    </Message.List>
                </Message>
            }
            </Grid.Column>
        </Grid>
    )
}

export default Portal