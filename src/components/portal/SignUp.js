import { useState } from "react"
import { Button, Form } from 'semantic-ui-react'

function SignUp({ signup, addError }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [suffix, setSuffix] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        if (password !== passwordConf) {
            addError("Password fields must match")
            setUsername("")
            setPassword("")
            setPasswordConf("")
            setFirstName("")
            setLastName("")
            setSuffix("")
            setPhone("")
            setEmail("")
            
            return
        }

        signup({
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            suffix: suffix,
            phone: phone,
            email: email
        },
        "")

        setUsername("")
        setPassword("")
        setPasswordConf("")
        setFirstName("")
        setLastName("")
        setSuffix("")
        setPhone("")
        setEmail("")
    }

    return(
        <Form onSubmit={onFormSubmit}>
            <Form.Input 
                type="text" 
                icon="user" 
                iconPosition="left" 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />

            <Form.Input 
                type="password" 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />

            <Form.Input 
                type="password" 
                icon="lock" 
                iconPosition="left" 
                placeholder="Verify Password" 
                value={passwordConf} 
                onChange={e => setPasswordConf(e.target.value)}
            />

            <Form.Input 
                type="text" 
                icon="tag" 
                iconPosition="left" 
                placeholder="First Name" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
            />

            <Form.Input 
                type="text" 
                icon="tag" 
                iconPosition="left" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)}
            />

            <Form.Input 
                type="text" 
                icon="tag" 
                iconPosition="left" 
                placeholder="Suffix" 
                value={suffix}
                onChange={e => setSuffix(e.target.value)}
            />

            <Form.Input 
                type="text" 
                icon="phone" 
                iconPosition="left" 
                placeholder="Phone Number" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
            />

            <Form.Input 
                type="text" 
                icon="mail" 
                iconPosition="left" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
            />

            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default SignUp