import { useState } from "react"

function SignUp({ signup }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [suffix, setSuffix] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const [pwdError, setPwdError] = useState("")

    function onFormSubmit(event) {
        event.preventDefault()

        if (password !== passwordConf) {
            setPwdError(true)
            setPassword("")
            setPasswordConf("")
            
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
        <div>
            <form onSubmit={onFormSubmit}>
                <label>username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />

                <label>password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <label>passwordConf</label>
                <input type="password" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} />

                <label>firstName</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />

                <label>lastName</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />

                <label>suffix</label>
                <input type="text" value={suffix} onChange={e => setSuffix(e.target.value)} />

                <label>phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />

                <label>email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                <input type="submit" />
            </form>
            {pwdError && <p>Password fields must match</p>}
        </div>
        
    )
}

export default SignUp