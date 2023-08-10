import { combineReducers } from "redux";
import { AdminReducer, UsersReducer, alertPushReducer ,Configurations,Operations} from "./public";



export const publicReducer = combineReducers({
    alert : alertPushReducer,
    admin : AdminReducer,
    users : UsersReducer,
    Configurations,
    Operations
   
})

