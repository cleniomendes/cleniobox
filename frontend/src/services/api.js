import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cleniobox-backend.herokuapp.com',
});

export default api;