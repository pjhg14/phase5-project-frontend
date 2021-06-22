let initialState = {
    error: "user not logged in",
    new_site_showing: false,
    new_project_showing: false
}

function userReducer(state = initialState, action) {
    switch(action.type) {
        // User Model ===========================================================================================>
        case "login":
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case "editUser":
            return {
                ...state,
                user: action.payload
            }
        // End User Model =======================================================================================>

        // Site Model ===========================================================================================>
        case "addSite":
            const newSiteList = [...state.user.sites, action.payload]

            return {
                ...state,
                user: {
                    ...state.user,
                    sites: newSiteList
                },
                new_site_showing: false
            }
        case "editSite":
            const editedSiteList = state.user.sites.map(site => {
                return site.id !== action.payload.id ? site : action.payload
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    sites: editedSiteList
                }
            }
        case "deleteSite":
            const filteredSiteList = state.user.sites.filter(site => {
                return site.id !== action.payload.id
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    sites: filteredSiteList
                }
            }
        case "showNewSiteCard":
            return {
                ...state,
                new_site_showing: true
            }
        case "hideNewSiteCard":
            return {
                ...state,
                new_site_showing: false
            }
        // End Site Model =======================================================================================>

        // Project Model ========================================================================================>
        case "addProject":
            const newProjectList = [...state.user.projects, action.payload]

            return {
                ...state,
                user: {
                    ...state.user,
                    projects: newProjectList
                },
                new_project_showing: false
            }
        case "editProject":
            const editedProjectList = state.user.projects.map(project => {
                return project.id !== action.payload.id ? project : action.payload
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    projects: editedProjectList
                }
            }
        case "deleteProject":
            const filteredProjectList = state.user.projects.filter(project => {
                return project.id !== action.payload.id
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    projects: filteredProjectList
                }
            }
        case "showNewProjectCard":
            return {
                ...state,
                new_project_showing: true
            }
        case "hideNewProjectCard":
            return {
                ...state,
                new_project_showing: false
            }
        // End Project Model ====================================================================================>

        // Experience Model =====================================================================================>
        case "addExperience":
            const newExperienceList = [...state.user.experiences, action.payload]

            return {
                ...state,
                user: {
                    ...state.user,
                    experiences: newExperienceList
                }
            }
        case "editExperience":
            const editedExperienceList = state.user.experiences.map(experience => {
                return experience.id !== action.payload.id ? experience : action.payload
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    experiences: editedExperienceList
                }
            }
        case "deleteExperience":
            const filteredExperienceList = state.user.experiences.filter(experience => {
                return experience.id !== action.payload.id
            })

            return {
                ...state,
                user: {
                    ...state.user,
                    experiences: filteredExperienceList
                }
            }
        // End Experience Model ================================================================================>
        default:
            return state
    }
}

export default userReducer