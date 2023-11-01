<script setup lang="ts">
    import AdminSidebar from './AdminSidebar.vue';
import AdminTrailerHero from './AdminTrailerHero.vue';

</script>

<template>
    <nav>
        <AdminSidebar></AdminSidebar>
    </nav>
    <header>
        <AdminTrailerHero>

        </AdminTrailerHero>
    </header>
</template>

<style scoped lang="scss">
    header {
        padding: 30px;
        background-color: aqua;
    }
</style>