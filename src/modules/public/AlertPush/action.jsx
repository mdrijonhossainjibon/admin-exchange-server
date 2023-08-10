import { ADD_NOTIFICATION, ALERT_PUSH, CLEAR_NOTIFICATIONS } from "./constanst";

export const Add_Notic = ({message_type ,message,show})=>({
   type : ADD_NOTIFICATION,
   message_type ,
    message,
    show
})

export const AlertRemove = ()=>({
    type : CLEAR_NOTIFICATIONS,
 })

export const AlertPush = ({message_type ,message,show})=>({
    type : ALERT_PUSH,
    message_type ,
    message,
    show
   
 })