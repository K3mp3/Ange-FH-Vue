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
        <RouterLink class="router-link" to="/admin/trailerform"><FontAwesome :icon="['fas', 'upload']" style="color: #171717;" /> Upload trailer poster</RouterLink>
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

    .router-link {
        background-color: #EEEEEE;
        border: none;
        width: 100%;
        height: 33px;
        border-radius: 15px;
        color: rgb(23, 23, 23);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        font-family: Verdana;
        padding: 10px;
    }
</style>