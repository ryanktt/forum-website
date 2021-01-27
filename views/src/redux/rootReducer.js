import {combineReducers} from 'redux';
import authReducer from './reducers/auth'
import valAlertReducer from './reducers/validationAlert';

const rootReducer = combineReducers({
    auth: authReducer,
    valAlert: valAlertReducer

})

export default rootReducer;