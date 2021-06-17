let initialState = {
    error: "user not logged in"
}

function userReducer(state = initialState, action) {
    switch(action.type) {
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
        default:
            return state
    }
}

export default userReducer