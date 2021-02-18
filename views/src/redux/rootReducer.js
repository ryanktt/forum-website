import {combineReducers} from 'redux';
import authReducer from './reducers/auth'
import valAlertReducer from './reducers/validationAlert';
import threadReducer from './reducers/thread';
import loadingReducer from './reducers/loading';
import postReducer from './reducers/post';

const rootReducer = combineReducers({
    auth: authReducer,
    valAlert: valAlertReducer,
    thread: threadReducer,
    loading: loadingReducer,
    post: postReducer

})

export default rootReducer;