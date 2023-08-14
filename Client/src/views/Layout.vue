<template>
    <div>
        <NavView></NavView>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <FooterView></FooterView>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
    import NavView from "./NavView.vue";
    import FooterView from "./FooterView.vue";
  </script>
  