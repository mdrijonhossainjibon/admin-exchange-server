import { SET_USER, UPDATE_USER } from "./constanst";

const initialState = [

];

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_USER:
      return state.map(user => {
        if (user.uid === action.payload.uid) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    default:
      return state;
  }
};
