import {AUTH_USER , SHOW_NOTIFICATION , CLEAR_MSG , IS_LOGOUT} from '../actions/type'

// import {db} from '../firebase'
import firebase from '../firebase'

export const  user =(email, password)=>dispatch => {
	// return function (dispatch) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)	
			.then(user => {
				
				var user = firebase.auth().currentUser;
				console.log(user);
				dispatch({
					type: AUTH_USER,
					payload: true,
					user: user,
				
				});

			})
			.catch(error => {
				dispatch({
					type: SHOW_NOTIFICATION,
					payload: error.message,
				});
			});

		}
	
		export function clearMsg() {
			return {
				type: CLEAR_MSG,
			};
        }
        
        export const Logout=()=> dispatch => {
			
				firebase
					.auth()
					.signOut()
					.then(() => {
						dispatch({
							type: IS_LOGOUT,
						});
					})
					
			
		}
