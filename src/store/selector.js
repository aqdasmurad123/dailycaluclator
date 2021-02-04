const { fetchPosts, addPost } = require('./actions/actions');
export function mapStateToProps(state) {
	return {
		posts: state.posts,
	};
}
export function mapDispatchToProps(dispatch) {
	return {
		addPost: post => dispatch(addPost(post)),
		
		fetchPosts: () => dispatch(fetchPosts()),
	};
}
