<script setup lang="ts">
    import AdminNav from './AdminNav.vue';
    import AdminTrailerForm from './AdminTrailerForm.vue';
    import AdminTrailerHero from './AdminTrailerHero.vue';

</script>

<template>
    <nav>
        <AdminNav></AdminNav>
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
        background-color: #171717;
        padding: 20px 30px;
    }
</style>