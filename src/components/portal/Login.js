import { useState } from "react"
import { Button, Form } from 'semantic-ui-react'

function Login({ login }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        login({
            email: email,
            password: password
        },
        "login")

        setEmail("")
        setPassword("")
    }

    return(
        <Form onSubmit={onFormSubmit}>
            <Form.Input 
                type="text" 
                icon="mail" 
                iconPosition="left" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
            />

            <Form.Input 
                type="password" 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />

            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default Login