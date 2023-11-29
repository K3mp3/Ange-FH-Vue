/* eslint-disable import/prefer-default-export */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowNav = defineStore('nav', () => {
  const showNav = ref(true);

  function hideNav(nav: boolean) {
    console.log("navStore:", nav);
    showNav.value = nav;
  }

  return { showNav, hideNav };
})