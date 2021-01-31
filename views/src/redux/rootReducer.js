import {combineReducers} from 'redux';
import authReducer from './reducers/auth'
import valAlertReducer from './reducers/validationAlert';
import threadReducer from './reducers/thread';

const rootReducer = combineReducers({
    auth: authReducer,
    valAlert: valAlertReducer,
    thread: threadReducer

})

export default rootReducer;