/* eslint-disable consistent-return */
import { useSignInStore } from "@/stores/signIn";
import axios from "axios";
import type { IUser } from "@/models/IUser";

const BASE_URL = "http://localhost:3000";

export async function registerUser(user: IUser) {
    try {
        const response = await axios.post<IUser>(`${BASE_URL}/users/createuser`, user);
        console.log(response);      
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signInUser(user: IUser) {

    const userStore = useSignInStore();

    try {
        const response = await axios.post<IUser>(`${BASE_URL}/users/loginuser`, user);  
        userStore.singedIn = true;
        userStore.signInUser();
        
        return response.data;

    } catch (error) {
        console.log("error");
    }
}