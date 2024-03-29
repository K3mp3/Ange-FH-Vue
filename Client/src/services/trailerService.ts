import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default async function getTrailers() {
    try {
        const response = await axios.get(`${BASE_URL}/trailer`);
        return response.data
    } catch (error) {
        return error;
    }
}

export  async function saveTrailer(trailer: FormData) {
    try {
        console.log(trailer)
        const response = await axios.post<FormData>(`${BASE_URL}/trailer/savetrailer`, trailer)
        console.log(response.data)
        return response.data;
    } catch (error) {
        return false;
    }
}