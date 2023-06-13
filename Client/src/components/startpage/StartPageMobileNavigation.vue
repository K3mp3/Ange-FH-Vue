<script  lang="ts" setup="">
defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
 <nav :class="{'open' : isOpen}">
   <ul>
     <li>Menu item 1</li>
     <li>Menu item 2</li>
   </ul>
 </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  right: -100%; /* hide menu outside right side of screen*/
  height: 100vh;
  background: #1a1a1a;
  padding: 16px;
  transition: right .3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
nav.open {
  right: 0; /* show menu */
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
