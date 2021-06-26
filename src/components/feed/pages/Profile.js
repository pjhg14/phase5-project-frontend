import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Card } from 'semantic-ui-react'
import SiteCard from "./cards/SiteCard";
import SiteForm from "./forms/SiteForm";
import ProjectCard from "./cards/ProjectCard";
import ProjectForm from "./forms/ProjectForm";
import ExperienceCard from "./cards/ExperienceCard";
import AddExperienceModal from "./modals/AddExperienceModal";
import UserInfo from "./info/UserInfo";

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

    // Sites
    const siteList = user.sites.map(site => {
        return(
            <SiteCard site={site} key={site.id}/>
        )
    })

    function toggleStieForm(event) {
        dispatch({type: "toggleNewSiteCard"})
    }

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
            <UserInfo/>
            <h4>Sites:</h4>
            <Card.Group centered> 
                { siteList }
                    <Card>
                        <Card.Content>
                            {newSiteShowing && 
                                <SiteForm />
                            }
                        </Card.Content>
                        <Button onClick={() => dispatch({type: "toggleNewSiteCard"})}>
                            {newSiteShowing ? "Cancel" : "Add Site"}
                        </Button>
                    </Card>
            </Card.Group>
            <h4>Projects:</h4>
            <Card.Group centered>
                { projectList }
                    <Card>
                        <Card.Content>
                            {newProjectShowing && 
                                <ProjectForm />
                            }
                        </Card.Content>
                        <Button onClick={() => dispatch({type: "toggleNewProjectCard"})}>
                            {newProjectShowing ? "Cancel" : "Add Project"}
                        </Button>
                    </Card>
            </Card.Group>
            <h4>Expreiences:</h4>
            <Card.Group centered>
                { experienceList }
                <Card>
                    <Card.Content>
                        <AddExperienceModal />
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}

export default Profile