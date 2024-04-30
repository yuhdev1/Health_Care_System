import axios from "axios";
export const httpClient = axios.create({
    baseURL: "http://localhost:8090",
    headers: {
        Accept: 'application/json'
    }
});