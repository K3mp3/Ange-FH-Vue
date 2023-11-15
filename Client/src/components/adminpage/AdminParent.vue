<script setup lang="ts">
    import AdminNav from './AdminNav.vue';
    import AdminTrailerHero from './AdminTrailerHero.vue';
import AdminTrailers from './AdminTrailers.vue';

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
        <AdminTrailers></AdminTrailers>
    </main>
</template>

<style scoped lang="scss">
    header {
        width: 100vw;
    }

    main {
        background-color: #171717;
        padding: 40px 15px;
        display: flex;
        flex-direction: column;
        gap: 50px;
        align-items: center;
    }

    .router-link {
        background-color: #EEEEEE;
        border: none;
        width: calc(100% - 45px);
        height: 33px;
        border-radius: 15px;
        color: rgb(23, 23, 23);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        font-family: Verdana;
        font-size: 0.9rem;
        padding: 10px;
    }
</style>