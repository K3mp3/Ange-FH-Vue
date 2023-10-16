/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserEmail = defineStore('email', () => {
  const userEmail = ref("");

  function saveEmail(email: string) {
    console.log("saveEmail:", email);
    userEmail.value = email;
  }

  return { userEmail, saveEmail };
})
