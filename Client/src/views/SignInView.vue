<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onMounted } from "vue";
  import SignInParent from "../components/signin/SignInParent.vue";

  const router = useRouter();

  onMounted(() => {
    router.push({ name: 'home' });
  })
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
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
    }
</style>
