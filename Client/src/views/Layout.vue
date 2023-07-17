<script setup lang="ts">
    import NavView from "./NavView.vue";
</script>

<template>
    <div>
        <header>
            <NavView></NavView>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer></footer>
    </div>
</template>