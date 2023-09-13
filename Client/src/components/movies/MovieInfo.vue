<!-- eslint-disable no-plusplus -->
<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref  } from 'vue';
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
const movieDescription = ref("");

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
        const response = await axios.get(`http://localhost:3000/movie/movie/${id.value}`);
        moviePoster.value = response.data.poster;
        movieTitle.value = response.data.title;
        movieDescription.value = response.data.description;
        console.log(movieDescription.value);
    } catch (error) {
        alert(error);
    }
}

onMounted(() => {
    getMovie();
    getMovieHeader();
})
</script>

<template>
        <div class="trailer-container">
            <img :src="`http://localhost:3000/trailer/image/${trailerPoster}`" alt="trailer" class="trailer-img">
            <div class="blurred-background">
                <div class="movie-parent-container">
                    <div class="movie-container">
                        <img :src="`http://localhost:3000/movie/image/${moviePoster}`" alt="trailer" class="movie-poster">
                    </div>
                    <div class="movie-title-parent-container">
                        <div class="movie-title-container">
                            <h2>{{movieTitle}}</h2>
                            <button type="submit" class="buy-ticket-btn"><a href="http://folketshus-ange.internetbokningen.com/chap/bookforestall/">Köp biljetter</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="movie-description-container">
            <p>{{ movieDescription }}</p>
        </div>
</template>

<style scoped>
    h2 {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 15px;
        margin: auto;
        margin-left: 5px;
    }

    p, a {
        color: #fff;
    }


    a {
        text-decoration: none;
    }

    .hide {
        display: none;
    }

    .trailer-container {
        height: 70vh;
        overflow-x: hidden;
    }

    .blurred-background {
        width: 100%;
        height: 70vh;
        background-color: rgba(0, 0, 0, 0.61);
        backdrop-filter: blur(3px);
        position: absolute;
        z-index: 1;
        top: 0;
        margin-top: 89px;
        display: flex;
        justify-content: end;
    }

    .movie-parent-container {
        width: 100%;
        display: flex;
        flex-direction: row; 
        align-items: end;
    }

    .movie-container {
        width: 100%;
        padding: 20px 20px 0 20px;
    }

    .movie-poster {
        width: 100%;
    }

    .movie-title-parent-container {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 10px;
    }

    .movie-title-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding-bottom: 4px;
    }

    .buy-ticket-btn {
        transition: all 0.2s ease-in-out;
        background: #FF7B0F;
        border: 1px solid #FF7B0F;
        color: #eeeeee;
        font-size: 0.9rem;
        font-weight: 300;
        width: calc(100% - 10px);
        padding: 6px 0;
        border-radius: 20px;
    }

    .buy-ticket-btn:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border: 1px solid #FF7B0F;
        cursor: pointer;
    }

    .movie-description-container {
        padding: 20px;
    }

    @media screen and (min-width: 310px) {
        h2 {
            font-size: 1.5rem;
        }
    }

    @media screen and (min-width: 420px) {
        h2 {
            font-size: 1.6rem;
        }

        .buy-ticket-btn {
            padding: 8px 0;
        }

        .movie-description-container {
            margin-top: 20px;
        }
    }

    @media screen and (min-width: 530px) {
        h2 {
            font-size: 1.7rem;
        }

        .trailer-img {
            min-width: 100%;
            min-height: 70vh;
        }

        .blurred-background {
            align-items: end;
            justify-content: center;
            overflow-y: hidden;
            overflow-x: hidden;
        }

        .movie-parent-container {
            max-width: 530px;
        }

        .buy-ticket-btn {
            font-size: 1rem;
            padding: 10px 0;
        }

        .movie-description-container {
            max-width: 530px;
            margin: auto;
            margin-top: 20px;
        }
    }

    @media screen and (min-width: 1080px) {
        h2 {
            font-size: 1.8rem;
        }
    }
</style>    