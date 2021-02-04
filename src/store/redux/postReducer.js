import { DAILY_INCOME , FETCH_POST , DELETE_POST , UPDATE_POST} from '../actions/type'

import {db} from '../firebase'

const posts =  db.collection('posts')

const initialState = {
	posts:[],
	
	}
    

function reducer(state = initialState, action) {
	switch (action.type) {
		
		case DAILY_INCOME:
			
			return {
			...state,
            };
            
	
        case FETCH_POST: {
		   const data = [];
		   console.log(data);
			action.payload.docs.forEach(doc => {
				data.push({...doc.data(),id:doc.id});
			});
			return {
				...state,
				posts: data,
			};
		}
				   
		case DELETE_POST: {
		
			return {
				...state,
			
			
			};
		}
            

		
		case UPDATE_POST: {
			return {
				...state,
			};
		}
		
       

        default:
            return{
                ...state
 			} 
            
    }
}


export default reducer;