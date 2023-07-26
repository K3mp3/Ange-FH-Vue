<script setup lang="ts">
    import NavBottom from './NavBottom.vue';
    import NavHeaderLogo from './NavHeaderLogo.vue';
</script>
<template>
    <header>
        <NavHeaderLogo></NavHeaderLogo>
    </header>
    <nav>
        <NavBottom></NavBottom>
    </nav>
</template>
<style scoped>
    header {
      width: 100%;
      margin: auto;
      padding: 20px;
      top: 0;
      background-color: rgb(28, 28, 28, 0.9);
    }

    nav {
        position: fixed;
        bottom: 20px;
        left: 0;
        width: 100%;
        height: 70px; /* Adjust the height of the bottom navigation bar */
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>