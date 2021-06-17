import { combineReducers } from "redux";
import userReducer from "./userReducer";
import applicationReducer from "./applicationReducer";

const rootReducer = combineReducers({userReducer, applicationReducer})

export default rootReducer