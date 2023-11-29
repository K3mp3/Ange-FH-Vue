/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSignInPopUp = defineStore('signinpopup', () => {
    const clickedSignIn = ref(false);
  
    function showSignInForm(isSignedInClicked: boolean) {
      console.log("signInStore:", isSignedInClicked);
      clickedSignIn.value = isSignedInClicked;
    }
  
    return { clickedSignIn, showSignInForm };
  })