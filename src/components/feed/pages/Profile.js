import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Card, Icon } from 'semantic-ui-react'
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

    // Projects
    const projectList = user.projects.map(project => {
        return(
            <ProjectCard project={project} key={project.id} />
        )
    })
    
    // Experiences
    const experienceList = user.experiences.map(experience => {
        return(
            <ExperienceCard experience={experience} key={experience.id}/>
        )
    })

    return(
        <div>
            <h2>Profile</h2>
            <UserInfo />
            <h3>Sites:</h3>
            <Card.Group centered> 
                { siteList }
                    <Card>
                        <Card.Content>
                            {newSiteShowing ? 
                                <SiteForm />
                                :
                                <Icon.Group size="huge">
                                    <Icon name="world" />
                                    <Icon name="add" corner />
                                </Icon.Group>
                            }
                        </Card.Content>
                        <Button onClick={() => dispatch({type: "toggleNewSiteCard"})}>
                            {newSiteShowing ? "Cancel" : "Add Site"}
                        </Button>
                    </Card>
            </Card.Group>
            <h3>Projects:</h3>
            <Card.Group centered>
                { projectList }
                    <Card>
                        <Card.Content>
                            {newProjectShowing ? 
                                <ProjectForm />
                                :
                                <Icon.Group size="huge">
                                    <Icon name="puzzle" />
                                    <Icon name="add" corner />
                                </Icon.Group>
                            }
                        </Card.Content>
                        <Button onClick={() => dispatch({type: "toggleNewProjectCard"})}>
                            {newProjectShowing ? "Cancel" : "Add Project"}
                        </Button>
                    </Card>
            </Card.Group>
            <h3>Expreiences:</h3>
            <Card.Group centered>
                { experienceList }
                <Card>
                    <Card.Content>
                        <Icon.Group size="huge">
                            <Icon name="certificate" />
                            <Icon name="add" corner />
                        </Icon.Group>
                    </Card.Content>
                    <AddExperienceModal />
                </Card>
            </Card.Group>
        </div>
    )
}

export default Profile