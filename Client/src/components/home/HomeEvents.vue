<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { gsap } from 'gsap';

interface IEvent {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

interface IEventBackground {
  image: string;
}

const movies = ref<IEvent[]>([]);
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
  310: {
    itemsToShow: 1.5,
    snapAlign: "start"
  },
  420: {
    itemsToShow: 1.75,
    snapAlign: "start"
  },
  510: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  600: {
    itemsToShow: 2.25,
    snapAlign: "start"
  },
  690: {
    itemsToShow: 2.5,
    snapAlign: "start"
  },
  780: {
    itemsToShow: 3,
    snapAlign: "start"
  },
  870: {
    itemsToShow: 4,
    snapAlign: "start"
  },
  660: {
    itemsToShow: 5,
    snapAlign: "start"
  },
  750: {
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
  <div class="movies-container">
    <div class="carousel-container">
      <h1>Kommande <span>Event</span></h1>
      <div class="carousel-items-container">
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
    </div>
  </div>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 70vh;
}

.movie-information {
  display: none;
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
  margin-top: 40px;
}

.carousel-container {
  padding-left: 40px;
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
	border-radius: 8px;
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

@media screen and (min-width: 420px) {
  h1 {
    font-size: 1.7rem;
  }

  span {
    font-size: 1.7rem;
  }
}

@media screen and (min-width: 510px) {
  h1 {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
}

@media screen and (min-width: 600px) {
  h1 {
    font-size: 1.9rem;
  }

  span {
    font-size: 1.9rem;
  }
}

@media screen and (min-width: 1800px) {

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
}

/* Theater attribution: Image by <a href="https://www.freepik.com/free-photo/long-hair-artist-stage_11107899.htm#query=theater&position=14&from_view=search&track=sph">Freepik</a> */
</style>
