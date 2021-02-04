import {AUTH_USER , SHOW_NOTIFICATION , IS_LOGOUT } from '../actions/type'

const initialState = {

	 user:JSON.parse(localStorage.getItem("user")),
	loggedIn:JSON.parse(localStorage.getItem("loggedIn"))==null ? false:true,
	

};
function authreducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_USER:
			localStorage.setItem("user" , JSON.stringify(action.user))
			localStorage.setItem("loggedIn" , JSON.stringify(action.payload))
		

			
			return {
				...state,
				user: action.user,
				loggedIn: true,
				userid:action.user
			};
          
            case SHOW_NOTIFICATION:
				console.log(action.payload)
                return{
                    ...state,
                    notification : action.payload
                }
		   
				case IS_LOGOUT:
					localStorage.clear();
					return {
						...state,
						loggedIn:false,
						user:null
					};
                   
		 
		
		default:
			return {
				...state,
			};
	}
}

export default authreducer;