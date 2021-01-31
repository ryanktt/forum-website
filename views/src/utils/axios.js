import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.origin,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;