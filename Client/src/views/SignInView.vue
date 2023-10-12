<script setup lang="ts">
  import SignInParent from "../components/signin/SignInParent";
</script>

<template>
  <main>
    <SignInParent></SignInParent>
  </main>
</template>

<style scoped>
    main {
        width: 100vw;
        height: 100vh;
        background-color: #1B1B1B;
        display: flex;
        justify-content: center;
    }

    p {
      color: white;
    }
</style>
