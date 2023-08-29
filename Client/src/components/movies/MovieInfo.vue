<!-- eslint-disable no-plusplus -->
<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref  } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Get the current route object
const id = ref(route.params.id);
console.log(id.value);

interface IMovieHeader {
    _id: string;
    title: string;
    poster: string;
    link: string;
}

const movieHeader = ref<IMovieHeader[]>([]);

const moviePoster = ref("")
const movieTitle = ref("")
const trailerPoster = ref("");

async function getMovieHeader() {
    try {
        const response = await axios.get("http://localhost:3000/trailer");
        movieHeader.value = response.data;

        for (let i = 0; i < movieHeader.value.length; i++) {

            if (movieHeader.value[i].title === movieTitle.value) {
                const ifResponse = movieHeader.value[i].poster;
                trailerPoster.value = ifResponse;
                console.log(trailerPoster.value);
            }
        }
    } catch (error) {
        alert(error);
    }
}

async function getMovie() {
    try {
        const response = await axios.get(`http://localhost:3000/movie/movie/${id.value}`)
        moviePoster.value = response.data.poster
        movieTitle.value = response.data.title
        console.log(movieTitle.value)
    } catch (error) {
        alert(error);
    }
}

onMounted(async () => {
    getMovie();
    getMovieHeader();
    
})

// const selectedMovie = computed(() => {
//     return movieHeader.value.find(movie => movie.title === movieTitle.value);
// });
</script>

<template>
        <div class="trailer-container">
            <img :src="`http://localhost:3000/trailer/image/${trailerPoster}`" alt="trailer">
        </div>
        
        <div class="movie-parent-container">
            <div class="movie-container">
                <img :src="`http://localhost:3000/movie/image/${moviePoster}`" alt="trailer">
            </div>
            <div class="movie-title-parent-container">
                <div class="movie-title-container">
                    <h2>{{movieTitle}}</h2>
                </div>
            </div>
        </div>
</template>

<style scoped>
    h2 {
        color: #fff;
        font-size: 1.3rem;
        font-weight: 700;
    }
    .trailer-container {
        max-width: 100%;
        margin-bottom: 40px;
    }

    .movie-parent-container {
        display: flex;
        flex-direction: row;
        padding: 0 30px;
    }

    .movie-container {
        min-width: 100px;
        position: relative;
        z-index: 1;
        margin-top: -80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .movie-title-parent-container {
        display: flex;
        justify-content: center;
        align-items: end;
        padding: 0 10px;
    }

    img {
        max-width: 100%;
    }

    @media screen and (min-width: 330px) {
        h2 {
            font-size: 1.4rem;
        }
    }
</style>    