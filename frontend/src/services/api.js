import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://cleniobox-backend.herokuapp.com',
    baseURL: 'http://localhost:3000',
});

export default api;