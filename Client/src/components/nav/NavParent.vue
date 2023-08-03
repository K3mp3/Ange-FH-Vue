<script setup lang="ts">
    import { ref } from "vue";

    import NavBottom from './NavBottom.vue';
    import NavHeaderLogo from './NavHeaderLogo.vue';

    const screenSize = ref();
    let width = document.documentElement.clientWidth;

    function controlScreenSize() {
        if (width > 1200) {
            console.log("width", width);
            screenSize.value = false;
        } else {
            screenSize.value = true;
        }
    }

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }

    function init() {
        console.log("hej");

        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("resize", controlScreenSize);

        updateScreenSize()
 
        if (width < 910) {
            screenSize.value = true;
        } else {
            screenSize.value = false;
        }
    }

    init();
</script>
<template>
    <header>
        <NavHeaderLogo></NavHeaderLogo>
    </header>
    <nav :class="{ hide: screenSize === false }">
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

    .hide {
        display: none;
    }
</style>