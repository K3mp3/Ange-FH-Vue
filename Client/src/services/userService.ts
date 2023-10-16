/* eslint-disable consistent-return */
import type { IUser } from "@/models/IUser";
import type { IUserToken } from "@/models/IUserToken";
import { useSignInStore } from "@/stores/signIn";
import axios from "axios";

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
        userStore.signedIn = true;
        userStore.signInUser();
        
        return response.data;

    } catch (error) {
        console.log("error");
    }
}

export async function checkToken(user: IUserToken) {
    try {
        console.log(user);
        const response = await axios.post<IUserToken>(`${BASE_URL}/users/checktoken`, user);  
        
        return response.data;

    } catch (error) {
        console.log("error");
    }
}