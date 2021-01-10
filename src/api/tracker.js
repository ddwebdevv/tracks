import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
    baseURL: 'https://traks-serverside.herokuapp.com'
});

//second parameter - error. sending this so server can see our authorization with each request
instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;