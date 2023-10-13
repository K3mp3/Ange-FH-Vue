/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSignInStore = defineStore("signInUser", () => {
    const singedIn = ref(false);

    function signInUser() {
        const singedIn = ref(true);
    }

    return { singedIn, signInUser };
})