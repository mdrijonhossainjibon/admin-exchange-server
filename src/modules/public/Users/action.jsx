import { FETCH_USER, SET_USER, UPDATE_USER, UserdataUpdate } from "./constanst";

export const fetchUser = () => ({
    type: FETCH_USER
  });
 
export  const setUser = (payload) => ({
    type: SET_USER,
    payload
  });


export const UserUpdate = (payload)=>({
  type : UserdataUpdate,
  payload
})

export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload

})