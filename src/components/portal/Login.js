import { useState } from "react"

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
        <form onSubmit={onFormSubmit}>
            <label>Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <input type="submit" />
        </form>
    )
}

export default Login