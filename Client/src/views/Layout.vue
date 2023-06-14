<script setup lang="ts">
    import StartView from "../views/StartView.vue";
</script>

<template>
    <div>
        <header>
            <StartView></StartView>
        </header>
        <main>
        <router-view></router-view>
        </main>
        <footer></footer>
    </div>
</template>