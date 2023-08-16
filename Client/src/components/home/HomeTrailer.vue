<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { gsap } from 'gsap';


/*Trailer*/

interface ITrailer {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const trailers = ref<ITrailer[]>([]);
console.log("trailers:", trailers)

async function getTrailer() {
  try {
  const response = await axios.get("http://localhost:3000/trailer");
  trailers.value = response.data;
  } catch (error) {
    alert(error);
  }
}


interface IMovie {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const movies = ref<IMovie[]>([]);
console.log("movies:", movies)

const movieTrailerTitle = ref<HTMLElement | null>(null);
const movieTrailerTicketBtn = ref<HTMLElement | null>(null);

onMounted(async () => {
  getTrailer();
  
  gsap.from(movieTrailerTitle.value, {
    y: '-400%',
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  });

  gsap.from(movieTrailerTicketBtn.value, {
    x: '-400%',
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  });

  try {
    const response = await axios.get("http://localhost:3000/movie");
    movies.value = response.data;
    console.log(movies.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }

  window.addEventListener("resize", settings);

  settings();
});

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/movie");
    movies.value = response.data;
    console.log(movies.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }

  window.addEventListener("resize", settings);

  settings();
});

const getFirstMovieTrailerLink = computed(() => {
  const firstMovie = movies.value[0];
  return firstMovie ? firstMovie.link : '';
});

const getFirstMovieTitle = computed(() => {
  const firstTitle = movies.value[0];
  return firstTitle ? firstTitle.title : "";
})

const breakpoints = {
  320: {
    itemsToShow: 1.5,
    snapAlign: "start"
  },
  430: {
    itemsToShow: 1.75,
    snapAlign: "start"
  },
  540: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  650: {
    itemsToShow: 2.25,
    snapAlign: "start"
  },
  760: {
    itemsToShow: 2.5,
    snapAlign: "start"
  },
  870: {
    itemsToShow: 3,
    snapAlign: "start"
  },
  980: {
    itemsToShow: 4,
    snapAlign: "start"
  },
  1090: {
    itemsToShow: 5,
    snapAlign: "start"
  },
  1200: {
    itemsToShow: 6,
    snapAlign: "start"
  },
}

function settings() {
  return {
    itemsToShow: 1,
		snapAlign: "center"
  }
}
</script>

<template>
    <div class="movie-trailer-container">
      <div class="carousel-items-container">
        <carousel :settings="settings" class="carousel">
        <slide v-for="slide in trailers" :key="slide._id" class="slide">
          <div class="carousel__item">
            <img
                :src="`http://localhost:3000/trailer/image/${slide.poster}`"
                alt="trailer"
              >
          </div>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
      </div>

      <div class="buttons-container">
        <button class="secondary-btn">Köp biljetter</button>
        <button class="primary-btn">Se trailer</button>
      </div>
    </div>
</template>

<style scoped>
.carousel__prev, 
  .carousel__next, 
  .carousel__prev:hover, 
  .carousel__next:hover {
      color: white;
  }

iframe {
  width: 100%;
  height: 300px;
}

.movie-information {
  display: none;
}

.buttons-container {
  display: flex;
  padding: 20px 30px;
  gap: 15px;
}

.primary-btn {
  background-color: #ff7b0f;
  border: none;
  color: #eeeeee;
  width: 135px;
  padding: 9px;
  font-size: 1rem;
  font-weight: 100;
  border-radius: 40px;
}

.secondary-btn {
  background: transparent;
  border: 1px solid #ff7b0f;
  color: #eeeeee;
  width: 135px;
  padding: 9px;
  font-size: 1rem;
  font-weight: 100;
  border-radius: 40px;
}

h1 {
  font-size: 1.6rem;
  font-weight: 900;
  margin-left: 10px;
  color: #eeeeee;
}

span {
  font-size: 1.6rem;
  font-weight: 200;
}

.movies-container {
  margin-top: 10px;
  padding: 20px;
}

.carousel-container {
  padding-left: 0px;
  margin-top: 20px;
}

.carousel-items-container {
  display: flex;
  justify-content: end;
}

.carousel__item {
  width: 100%;
	color: white;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
  margin-top: 20px;
  padding: 0;
}

.carousel__slide {
  padding: 0;
}

img {
  max-width: 100%;
  padding: 0 10px;
}

@media screen and (min-width: 320px) {
  .movies-container {
    margin-top: 30px;
    margin-left: 20px;
    padding: 0px;
    overflow-x: hidden;
  }

  .carousel-container {
    margin-top: 20px;
  }
}

@media screen and (min-width: 430px) {
  .buttons-container {
    gap: 20px;
  }

  .primary-btn {
    width: 145px;
    padding: 10px;
  }

  .secondary-btn {
    width: 145px;
    padding: 10px;
  }

  h1 {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
  }
}

@media screen and (min-width: 540px) {
  .buttons-container {
    gap: 20px;
  }

  .primary-btn {
    width: 155px;
    padding: 11px;
  }

  .secondary-btn {
    width: 155px;
    padding: 11px;
  }

  h1 {
    font-size: 1.7rem;
  }

  span {
    font-size: 1.7rem;
  }
}

@media screen and (min-width: 650px) {
  .buttons-container {
    gap: 25px;
  }

  .primary-btn {
    width: 160px;
    padding: 11px;
  }

  .secondary-btn {
    width: 160px;
    padding: 11px;
  }

  h1 {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
}

@media screen and (min-width: 760px) {
  .buttons-container {
    gap: 30px;
  }

  .primary-btn {
    width: 165px;
    padding: 11px;
  }

  .secondary-btn {
    width: 165px;
    padding: 11px;
  }

  iframe {
    width: 100%;
    height: 350px;
  }

  h1 {
    font-size: 1.9rem;
  }

  span {
    font-size: 1.9rem;
  }
}

@media screen and (min-width: 870px) {
  .buttons-container {
    gap: 35px;
    margin-left: 40px;
  }

  .primary-btn {
    width: 170px;
    padding: 11px;
  }

  .secondary-btn {
    width: 170px;
    padding: 11px;
  }

  .movies-container {
    padding-left: 40px;
  }

  h1 {
    font-size: 2rem;
  }

  span {
    font-size: 2rem;
  }
}

@media screen and (min-width: 1200px) {
  .movies-container {
    padding-left: 50px;
  }

  iframe {
    width: 100%;
    height: 700px;
  }
  .movie-information {
    width: 32vw;
    height: 650px;
    position: relative;
    z-index: 1;
    margin-top: -650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }

  .hidden {
    display: none;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 900;
  }

  button {
    background-color: #ff7b0f;
    border: none;
    color: #eeeeee;
    width: 210px;
    height: 50px;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 10px;
  }
}

@media screen and (min-width: 1700px) {
  .movies-container {
    padding-left: 60px;
  }

  h1 {
    font-size: 3rem;
  }
}
</style>