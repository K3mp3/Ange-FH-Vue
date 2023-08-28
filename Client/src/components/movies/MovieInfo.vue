<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref  } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Get the current route object
const id = ref(route.params.id);
console.log(id.value);

const movieTitle = ref("")

async function getMovie() {
    try {
        const response = await axios.get(`http://localhost:3000/movie/movie/${id.value}`)
        console.log(response.data.imageData);
        movieTitle.value = response.data.poster
        console.log("movieTitle:", movieTitle.value)
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    getMovie();
    
})
</script>

<template>
    <div>
        <h2>Movie Details</h2>
        <p>ID: {{ movieTitle }}</p>
        <!-- Fetch and display movie details based on the ID -->
        <img :src="`http://localhost:3000/movie/image/${movieTitle}`" alt="trailer">
    </div>
</template>

<style scoped>
    h2, p {
        color: #fff;
    }
</style>    