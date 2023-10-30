/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSignInPopUp = defineStore("signInPopUp", () => {
    const clickedSignIn = ref(false);

    function showSignInForm(isSignedInClicked: boolean) {
        console.log("isSignedInClicked:", isSignedInClicked);
        clickedSignIn.value = isSignedInClicked;
        console.log(clickedSignIn.value);
    }

    return { clickedSignIn, showSignInForm };
})