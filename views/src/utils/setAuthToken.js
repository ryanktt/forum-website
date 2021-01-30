import axios from './axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);

    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');

    }
    console.log(axios.defaults.headers.common['x-auth-token'])

}

export default setAuthToken;