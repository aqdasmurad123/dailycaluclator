import {combineReducers} from 'redux'
import postReducer from './postReducer'
import authreducer from './authReducers'

export default combineReducers({
    posts:postReducer,
    auth:authreducer
})