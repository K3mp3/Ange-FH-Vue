/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSignInStore = defineStore("signInUser", () => {
    const signedIn = ref(false);

    function signInUser() {
        const signedIn = ref(true);
    }

    return { signedIn, signInUser };
})