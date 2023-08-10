import { SET_ADMIN_DATA } from "./constanst";

const initialState = {
    uid: '',
    fastname: '',
    middlename: '',
    lastname: '',
    email: '',
    Country: '',
    Referral_UID: '',
    Level: '',
    Role: '',
    Status: '',
    timetamp: ''
  };
  
 export const AdminReducer = (state = initialState, action) => {

  switch (action.type) {
      case SET_ADMIN_DATA:
        return {
          ...state,
          uid: action.payload.uid,
          fastname: action.payload.fastname,
          middlename: action.payload.middlename,
          lastname: action.payload.lastname,
          email: action.payload.email,
          Country: action.payload.Country,
          Referral_UID: action.payload.Referral_UID,
          Level: action.payload.Level,
          Role: action.payload.Role,
          Status: action.payload.Status,
          timetamp: action.payload.timetamp
        };
  
      default:
        return state;
    }
  };
  
  