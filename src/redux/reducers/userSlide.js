
import { updateUser } from '../actions/user';

// INIT STATE OF APP
const initialState = {
	userData:null
};



export default function userReducer(state = initialState, action) {

  //alert("INITIAL STATE FROM REDUCER:" + JSON.stringify(initialState));
  
  switch (action.type) {
    case 'user/update':
    //alert("UESR REDUCER - UPDATE STATE WITH DATA:" + JSON.stringify(action.payload));
      return {
        ... state,
        userData: action.payload,
      };
      //return action.payload;
    default:
      return state;
  }
}