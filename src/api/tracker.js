import axios from 'axios';

export default axios.create({
    baseURL: 'https://traks-serverside.herokuapp.com'
});