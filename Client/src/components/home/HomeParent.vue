<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { useSignInPopUp } from '@/stores/signInPopUp';
  import SignInView from '@/views/SignInView.vue';
  import HomeMovies from './HomeMovies.vue';
  import HomeEvents from './HomeEvents.vue';
  import HomeTrailer from './HomeTrailer.vue';
  import NavbarVue from '../nav/Navbar.vue';


  const isSignInClicked = ref(false);

  const signInPopUp = computed(() => useSignInPopUp().clickedSignIn)

  onMounted(() => {
    if (signInPopUp.value) {
      console.log(signInPopUp.value)
      isSignInClicked.value = true;
    } 
  })
</script>

<template>
  <nav>
    <NavbarVue></NavbarVue>
  </nav>
  <div class="sign-in-pop-up" v-if="isSignInClicked">
    <SignInView></SignInView>
  </div>
  <!-- <HomeTrailer></HomeTrailer> -->
  <HomeMovies></HomeMovies>
  <!-- <HomeEvents></HomeEvents> -->
</template>

<style scoped lang="scss">
  .sign-in-pop-up {
    position: absolute;
    z-index: 1;
  }
</style>