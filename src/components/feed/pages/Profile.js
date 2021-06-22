import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SiteCard from "./cards/SiteCard";
import SiteForm from "./forms/SiteForm";
import ProjectCard from "./cards/ProjectCard";
import ProjectForm from "./forms/ProjectForm";
import ExperienceCard from "./cards/ExperienceCard";

function Profile() {
    const user = useSelector(state => state.user)
    const newSiteShowing = useSelector(state => state.new_site_showing)
    const newProjectShowing = useSelector(state => state.new_project_showing)
    const dispatch = useDispatch()

    if (!user) return(
        <h1>
            Please
            <Link to="/profile/login">Log In</Link>
        </h1>
    )

    // function handleExperienceEdit(experience, column, payload) {
    //     const editedExperience = {...experience, [column]: payload}
        
    //     fetch(`http://localhost:3000/projects/${experience.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.token}`
    //         },
    //         body: JSON.stringify(editedExperience)
    //     })
    //         .then(resp => resp.json())
    //         .then(updatedExperience => {
    //             if (updatedExperience.error) {
    //                 console.log(updatedExperience.details)
    //             } else {
    //                 dispatch({type: "editExperience", payload: updatedExperience})
    //             }
    //         })
    // }

    // Sites
    const siteList = user.sites.map(site => {
        return(
            <SiteCard site={site} key={site.id}/>
        )
    })

    // Projects
    const projectList = user.projects.map(project => {
        return(
            <ProjectCard project={project} key={project.id} />
        )
    })
    
    // Experiences
    const experienceList = user.experiences.map(experience => {
        // TODO: Experiences might need a modal to show full description
        // modal will contain edit form
        // add modal for new experience
        return(
            <ExperienceCard experience={experience} key={experience.id}/>
        )
    })

    return(
        <div>
            <h3>Profile</h3>
            <div id="user-details">
                <p>username: {user.username}</p>
                <p>name: {user.full_name}</p>
                <p>phone: {user.phone}</p>
                <p>email: {user.email}</p>
                <button>edit</button>
            </div>
            <h4>Sites:</h4>
            <div id="user-sites"> 
                { siteList }
                {newSiteShowing && 
                    <div>
                        <SiteForm />
                        <button onClick={() => dispatch({type: "hideNewSiteCard"})}>cancel</button>
                    </div>
                }  
                <div id="card">
                    <button onClick={() => dispatch({type: "showNewSiteCard"})}>Add Site</button>
                </div>
            </div>
            <h4>Projects:</h4>
            <div id="user-projects">
                { projectList }
                {newProjectShowing && 
                    <div>
                        <ProjectForm />
                        <button onClick={() => dispatch({type: "hideNewProjectCard"})}>cancel</button>
                    </div>
                }
                <div id="card">
                    <button onClick={() => dispatch({type: "showNewProjectCard"})}>Add Project</button>
                </div>
            </div>
            <h4>Expreiences:</h4>
            <div id="user-experiences">
                { experienceList }
                <div id="card">
                    <button>Add Experience</button>
                </div>
            </div>
        </div>
    )
}

export default Profile