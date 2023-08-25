<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Get the current route object
const id = ref(route.params.id);
console.log(id.value);
</script>

<template>
    <div>
        <h2>Movie Details</h2>
        <p>ID: {{ id }}</p>
        <!-- Fetch and display movie details based on the ID -->
    </div>
</template>

<style scoped>
    h2, p {
        color: #fff;
    }
</style>    