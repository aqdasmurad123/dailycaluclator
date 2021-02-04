import {DAILY_INCOME , FETCH_POST , UPDATE_POST , DELETE_POST} from './type'

import {db} from '../firebase'
const posts = db.collection("posts");
export function addPost(post) {
	console.log(post)
    return function (dispatch) {
        posts.add(post).then(() => {
            dispatch({
                type: DAILY_INCOME,
				payload: post,
				
            });
            dispatch(fetchPosts(post.uid));
        });
    };
}
export function deletePost(postId ,userid) {

	

	return function (dispatch) {
		posts
			.doc(postId)
			.delete()
			.then(() => {
				dispatch({
					type: DELETE_POST,
					payload: postId,
				});
				dispatch(fetchPosts(userid));
			});
	};
}
export function editPost(postId, post) {
	return function (dispatch) {
		// console.log(postId);
		console.log(postId);
             posts
			.doc(postId)
			.update(post)
			.then(() => {
				dispatch({
					type: UPDATE_POST,
					payload: post,
				});
				dispatch(fetchPosts(post.userid));
			});
	};
}
export const fetchPosts=(uid)=>(dispatch)=> {
	console.log(uid);
	const data=[];
	// console.log(data);
    // return function (dispatch) {
		posts
		.where("created_by" , "==" , uid)
		.get().then(snapshot => {
			snapshot.forEach((doc)=>{
				data.push({...doc.data(), id:doc.id});
			});
            dispatch({
                type: FETCH_POST,
                payload: snapshot,
            });
        });
    // };
}   

