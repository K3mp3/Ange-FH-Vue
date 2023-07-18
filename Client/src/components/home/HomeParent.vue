<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { gsap } from 'gsap';

interface IMovie {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

interface IMovieBackground {
  image: string;
}

const movies = ref<IMovie[]>([]);
console.log("movies:", movies)

const movieTrailerTitle = ref<HTMLElement | null>(null);
const movieTrailerTicketBtn = ref<HTMLElement | null>(null);

onMounted(async () => {
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
  290: {
    itemsToShow: 1.5,
    snapAlign: "center"
  },
  400: {
    itemsToShow: 1.75,
    snapAlign: "center"
  },
  490: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  580: {
    itemsToShow: 2.25,
    snapAlign: "start"
  },
  670: {
    itemsToShow: 2.5,
    snapAlign: "start"
  },
  760: {
    itemsToShow: 3,
    snapAlign: "start"
  },
  850: {
    itemsToShow: 4,
    snapAlign: "start"
  },
  640: {
    itemsToShow: 5,
    snapAlign: "start"
  },
  730: {
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
  <header>
    <div class="movie-trailer-container">
      <iframe :src="getFirstMovieTrailerLink" title="YouTube video player" frameborder="0"  allowfullscreen></iframe>
      <div class="movie-information">
        <h1 ref="movieTrailerTitle">{{ getFirstMovieTitle }}</h1>
        <button ref="movieTrailerTicketBtn">Köp biljetter</button>
      </div>
    </div>
  </header>
  <div class="app">
    <carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true" class="carousel">
      <slide v-for="slide in movies" :key="slide._id">
        <div class="carousel__item">
          <img
              :src="`http://localhost:3000/movie/image/${slide.poster}`"
            >
        </div>
      </slide>

      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<style scoped>
  header {
    margin-top: -83px;
  }

iframe {
  width: 100%;
  height: 70vh;
}

.app {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: end;
}

.carousel {
  max-width: 90vw;
}

h1 {
  color: #eeeeee;
}

.carousel__item {
  width: 100%;
	color: white;
	font-size: 20px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
  margin-top: 20px;
}

.carousel__slide {
	padding: 10px;
}

.carousel__prev,
.carousel__next {
	background-color: #fff7;
}

img {
  max-width: 100%;
  border-radius: 10px;
}

@media screen and (min-width: 1800px) {
  .movie-information {
    width: 32vw;
    height: 500px;
    position: relative;
    z-index: 1;
    margin-top: -62vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  .hidden {
    display: none;
  }

  h1 {
    font-size: 4rem;
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

  .app {
    margin-top: 200px;
    padding: 20px;
    display: flex;
    justify-content: end;
  }
}

/* Theater attribution: Image by <a href="https://www.freepik.com/free-photo/long-hair-artist-stage_11107899.htm#query=theater&position=14&from_view=search&track=sph">Freepik</a> */
</style>
