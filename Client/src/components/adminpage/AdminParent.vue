<script setup lang="ts">
    import AdminSidebar from './AdminSidebar.vue';
    import AdminTrailerForm from './AdminTrailerForm.vue';
    import AdminTrailerHero from './AdminTrailerHero.vue';

</script>

<template>
    <nav>
        <!-- <AdminSidebar></AdminSidebar> -->
    </nav>
    <header>
        <AdminTrailerHero></AdminTrailerHero>
    </header>
    <main>
        <AdminTrailerForm></AdminTrailerForm>
    </main>
</template>

<style scoped lang="scss">
    header {
        width: 100vw;
    }

    main {
        background-color: aqua;
        padding: 20px 30px;
    }
</style>