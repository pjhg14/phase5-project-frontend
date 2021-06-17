let initialState = {
    applications: []
}

function applicationReducer(state = initialState, action) {
    switch(action.type) {
        case "setApplications":
            return {
                applications: action.payload
            }
        case "addApplication":
            return {
                ...state,
                applications: [...state.applications, action.payload]
            }
        case "editApplication":
        case "deleteApplication":
            // change list of applications to new list (whether singular application was edited or deleted)
            return {
                ...state,
                applications: action.payload
            }
        default:
            return state
    }
}

export default applicationReducer