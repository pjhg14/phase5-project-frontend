import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Segment, Button, Form, Grid, Icon } from "semantic-ui-react";

function UserInfo() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [first, last, end] = user.full_name.split(" ")

    const [username, setUsername] = useState(user.username)
    const [firstName, setFirstName] = useState(first)
    const [lastName, setLastName] = useState(last)
    const [suffix, setSuffix] = useState(end ? end : "")
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)

    function handleFormSubmit(event) {
        event.preventDefault()

        const editedUser = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            suffix: suffix,
            phone: phone,
            email: email
        }

        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedUser)
        })
            .then(resp => resp.json())
            .then(updatedUser => {
                if (updatedUser.error) {
                    console.log(updatedUser.details)
                } else {
                    console.log(updatedUser)
                    dispatch({type: "editUser", payload: updatedUser})
                    setEditing(false)
                }
            })
    }

    return(
        <Segment id="user-details">
            {editing ? 
                <>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Input 
                            type="text" 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Input 
                            type="text" 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={firstName} 
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <Form.Input 
                            type="text" 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)}
                        />
                        <Form.Input 
                            type="text" 
                            icon="user" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={suffix} 
                            onChange={e => setSuffix(e.target.value)}
                        />
                        <Form.Input 
                            type="text" 
                            icon="phone" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)}
                        />
                        <Form.Input 
                            type="text" 
                            icon="mail" 
                            iconPosition="left" 
                            placeholder="Title" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button type="submit">Submit</Button>
                        <Button icon="cancel" color="red" inverted onClick={() => setEditing(false)}/>
                    </Form>
                </>
                : 
                <Grid columns={2} relaxed="very">
                    <Grid.Column>
                        <p><Icon name="user"/> {user.username}</p>
                        <p><Icon name="user"/>  {user.full_name}</p>
                        <p><Icon name="phone"/> : {user.phone}</p>
                        <p><Icon name="mail"/>  {user.email}</p>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        {/* Image would go here */}
                        <Button icon="edit" onClick={() => setEditing(true)}/>
                    </Grid.Column>
                </Grid>
            }
            
        </Segment>
    )
}

export default UserInfo