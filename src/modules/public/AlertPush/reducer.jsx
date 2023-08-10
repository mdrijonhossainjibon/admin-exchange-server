
import { message } from 'antd';
import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from './constanst';

const initialState = {
  notifications: [],
};

export const alertPushReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      
      message.config({ duration: 3 ,top : 60}); 
      message[  action.show ? action.show :'success'](action.message ? action.message : 'null')
      return {
        ...state,
        notifications: [...state.notifications, {message_type : action.message_type,message : action.message ?action.message : null ,show : action.show ? action.show : 'error'}],
      };
    case CLEAR_NOTIFICATIONS :
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

