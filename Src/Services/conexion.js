import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://172.30.6.28:8000/api"; // Usa tu IP real

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});


const RutasPublicas = ['/login', '/registrar'];

api.interceptors.request.use(
    async (config) => {
        const isRutaPublica = RutasPublicas.some(route => config.url.includes(route));

        if (!isRutaPublica) {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(route => originalRequest.url.includes(route));

        if (error.response && error.response.status === 401 && !originalRequest._retry && !isRutaPublica) {
            originalRequest._retry = true;

            console.log("Token expirado o no autorizado. Redirigiendo al login.");
            await AsyncStorage.removeItem('userToken');
        }
        return Promise.reject(error);
    }
);
export default api;

