<script setup lang="ts">
    import { ref } from 'vue';
    import StartPageAsideLinks from './StartPageAsideLinks.vue';
    import StartPageMobileNavigation from './StartPageMobileNavigation.vue';

    let isMenuOpen = ref(false);

    function handleMobileMenu(isOpen: boolean) {
        isMenuOpen.value = isOpen;
    }
</script>
<template>
    <header>
        <StartPageAsideLinks @toggle="handleMobileMenu"></StartPageAsideLinks>
        <StartPageMobileNavigation :is-open="isMenuOpen"></StartPageMobileNavigation>
    </header>
</template>
<style scoped>
    header {
        width: 100%;
        background-color: #ffffff;
        margin: auto;
        padding: 20px;
    }
</style>