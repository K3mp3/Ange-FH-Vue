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
const movieDescription = ref("");
const screenSize = ref();

let width = document.documentElement.clientWidth;

function controlScreenSize() {
    if (width > 320) {
        console.log("width", width);
        screenSize.value = false;
    } else {
        screenSize.value = true;
    }
}

function updateScreenSize() {
    width = document.documentElement.clientWidth;
}

function init() {
    console.log("hej");

    window.addEventListener("resize", updateScreenSize);
    window.addEventListener("resize", controlScreenSize);

    updateScreenSize()

    if (width < 910) {
        screenSize.value = true;
    }
}

init(); 

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

onMounted(async () => {
    getMovie();
    getMovieHeader();
    
})
</script>

<template>
        <div class="trailer-container" :class="{hide: screenSize === true}">
            <img :src="`http://localhost:3000/trailer/image/${trailerPoster}`" alt="trailer">
        </div>
        
        <div class="movie-parent-container">
            <div class="movie-container">
                <img :src="`http://localhost:3000/movie/image/${moviePoster}`" alt="trailer">
            </div>
            <div class="movie-title-parent-container">
                <div class="movie-title-container">
                    <h2>{{movieTitle}}</h2>
                    <button type="submit" class="buy-ticket-btn"><a href="http://folketshus-ange.internetbokningen.com/chap/bookforestall/">Köp biljetter</a></button>
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
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 15px;
    }

    p, a {
        color: #fff;
    }

    a {
        text-decoration: none;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    .hide {
        display: none;
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
        width: 100%;
        z-index: 1;
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
        justify-content: end;
        align-items: end;
        padding-bottom: 4px;
    }

    .buy-ticket-btn {
        background: transparent;
        border: 1px solid #FF7B0F;
        color: #eeeeee;
        font-size: 0.9rem;
        font-weight: 300;
        width: 100%;
        padding: 5px 0;
        border-radius: 20px;
    }

    .buy-ticket-btn:hover {
        transition: all 0.1s ease-in-out;
        border: 1px solid #eeeeee;
        cursor: pointer;
    }

    .movie-description-container {
        padding: 30px;
    }

    @media screen and (min-width: 330px) {
        h2 {
            font-size: 1.4rem;
        }

        .movie-parent-container {
            max-width: 350px;
            margin: auto;
        }

        .movie-container {
            width: 140px;
        }

        .movie-description-container {
            max-width: 350px;
            margin: auto;
        }
    }

    @media screen and (min-width: 400px) {
        h2 {
            font-size: 1.6rem;
        }
        .movie-parent-container {
            max-width: 420px;
            margin: auto;
        }

        .movie-container {
            width: 160px;
        }

        .movie-title-container {
            max-width: 100%;
        }

        .movie-description-container {
            max-width: 420px;
            margin: auto;
        }
    }

    @media screen and (min-width: 540px) {
        h2 {
            font-size: 1.8rem;
        }
        .movie-parent-container {
            max-width: 560px;
            margin: auto;
        }
        .movie-container {
            width: 180px;
        }

        .movie-title-container {
            width: 100%;
            align-items: start;
        }

        .buy-ticket-btn {
            max-width: 220px;
            height: 30px;
        }

        .movie-description-container {
            max-width: 560px;
            margin: auto;
            margin-top: 10px;
        }
    }

    @media screen and (min-width: 650px) {
        h2 {
            font-size: 2rem;
        }
        .movie-parent-container {
            max-width: 670px;
            margin: auto;
            margin-top: -100px;
            gap: 20px;
        }
        .movie-container {
            width: 200px;
        }

        .movie-title-container {
            width: 100%;
            align-items: start;
        }

        .buy-ticket-btn {
            max-width: 220px;
            height: 31px;
        }

        .movie-description-container {
            max-width: 670px;
            margin: auto;
            margin-top: 20px;
        }
    }

    @media screen and (min-width: 760px) {
        h2 {
            font-size: 2.1rem;
        }
        .movie-parent-container {
            max-width: 780px;
            margin: auto;
            margin-top: -110px;
        }
        .movie-container {
            width: 220px;
        }

        .movie-title-container {
            width: 100%;
            align-items: start;
        }

        .movie-description-container {
            max-width: 780px;
            margin: auto;
            margin-top: 30px;
        }
    }

    @media screen and (min-width: 870px) {
        .movie-container {
            width: 240px;
        }
    }

    @media screen and (min-width: 980px) {
        .movie-parent-container {
            margin-top: -140px;
        }
        .movie-container {
            width: 260px;
        }
    }

    @media screen and (min-width: 1090px) {
        .movie-parent-container {
            margin-top: -150px;
        }
        .movie-container {
            width: 280px;
        }
        .buy-ticket-btn {
            height: 35px;
        }
        .movie-description-container {
            margin-top: 40px;
        }
    }

    @media screen and (min-width: 1200px) {
        img {
            width: 100%;
        }
        .trailer-container {
            width: 100%;
            max-height: 750px;
            overflow: hidden;
        }
        .movie-parent-container {
            margin-top: -160px;
            gap: 30px;
        }

        .buy-ticket-btn {
            height: 40px;
        }
        .movie-container {
            width: 310px;
        }
    }
</style>    