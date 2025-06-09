import axios from "axios";

export const API_BASE_URL = 'https://fashionhive-backend.onrender.com';

const jwt = localStorage.getItem('jwt');


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwt}`,
        "content-Type" : "application/json"
    }
})
