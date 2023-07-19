<template>
    <div>
        <NavView></NavView>
      <main>
        <router-view></router-view>
      </main>
      <footer></footer>
    </div>
  </template>
  
  <script setup lang="ts">
    import NavView from "./NavView.vue";
  </script>
  