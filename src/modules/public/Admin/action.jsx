import { FETCH_ADMIN_DATA, FETCH_ADMIN_TOKEN, SET_ADMIN_DATA } from "./constanst";

export const setAdminData = (payload) => ({
    type: SET_ADMIN_DATA,
    payload
  });
  
 export const  fetchAdmin = (payload)=>({
    type : FETCH_ADMIN_DATA,
    payload
 })

 export const fetchAdminToken = (payload)=>({
   type : FETCH_ADMIN_TOKEN,
   payload
 }) 