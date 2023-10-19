/* eslint-disable no-else-return */
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
        console.log(response.data)
        userStore.signInUser(true);
        
        return response.data;

    } catch (error) {
        return false;
    }
}

export async function checkToken(user: IUserToken) {
    try {
        const response = await axios.post<IUserToken>(`${BASE_URL}/users/checktoken`, user);  

        if (response.status === 201) {
            return true;
        } 
        if (response.status === 401) {
            return false;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
}

export async function isSignedIn(signedIn: boolean) {
    console.log(signedIn);
        
    try {
        const response = await axios.post<boolean>(
            `${BASE_URL}/users/issignedin`,
            { signedIn }, // Send the boolean value as an object property
            {
              headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
              },
            }
          );
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}