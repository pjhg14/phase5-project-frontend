import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function SiteForm({ site, setEditing }) {
    const user = useSelector(state => state.user)
    const addCardShowing = useSelector(state => state.new_site_showing)

    const dispatch = useDispatch()
    const [domain, setDomain] = useState("")
    const [url, setURL] = useState("")

    useEffect(() => {
        if (site) {
            setDomain(site.domain)
            setURL(site.url)
        }
    },[site])

    function handleFormSubmit(event) {
        event.preventDefault()

        const payload = {
            user_id: user.id,
            domain: domain,
            url: url
        }

        if (addCardShowing) {
            handleSiteAdd(payload)
        } else {
            handleSiteEdit(payload)
        }
    }

    function handleSiteAdd(newSite) {
        fetch(`http://localhost:3000/sites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(newSite)
        })
            .then(resp => resp.json())
            .then(addedSite => {
                if (addedSite.error) {
                    console.log(addedSite.details)
                } else {
                    dispatch({type: "addSite", payload: addedSite})
                }
            })
    }

    function handleSiteEdit(editedSite) {
        fetch(`http://localhost:3000/sites/${site.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(editedSite)
        })
            .then(resp => resp.json())
            .then(updatedSite => {
                if (updatedSite.error) {
                    console.log(updatedSite.details)
                } else {
                    dispatch({type: "editSite", payload: updatedSite})
                    setEditing(false)
                }
            })
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <label>Domain:</label>
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)}/>
            <label>URL:</label>
            <input type="text" value={url} onChange={e => setURL(e.target.value)}/>
            <input type="submit"/>
        </form>
    )
}

export default SiteForm