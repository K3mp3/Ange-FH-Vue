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

const events = ref<IEvent[]>([]);
console.log("events:", events)

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
    events.value = response.data;
    console.log(events.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }

  window.addEventListener("resize", settings);

  settings();
});

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/movie");
    events.value = response.data;
    console.log(events.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }

  window.addEventListener("resize", settings);

  settings();
});

const getFirstMovieTrailerLink = computed(() => {
  const firstMovie = events.value[0];
  return firstMovie ? firstMovie.link : '';
});

const getFirstMovieTitle = computed(() => {
  const firstTitle = events.value[0];
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
  <div class="movies-container">
    <div class="carousel-container">
      <h1>Kommande <span>Event</span></h1>
      <div class="carousel-items-container">
        <carousel :settings="settings" :breakpoints="breakpoints" class="carousel">
        <slide v-for="slide in events" :key="slide._id">
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
  /* Keep this part when moving all the styling to its own files. 
Remove the scoped part aswell when moving the style*/
.carousel__prev, 
  .carousel__next, 
  .carousel__prev:hover, 
  .carousel__next:hover {
      color: white;
  }

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
  padding: 20px;
}
.carousel-container {
  padding-left: 0px;
  margin-top: 20px;
}

.carousel-items-container {
  /* display: flex; */
  justify-content: end;
  background-color: aqua;
}

.carousel__item {
  width: 100%;
	color: white;
	font-size: 20px;
	justify-content: center;
	align-items: center;
  margin-top: 20px;
  padding: 0;
}

.carousel__slide {
  display: block;
  padding: 0;
}

img {
  max-width: 100%;
  padding: 0 10px;
}

@media screen and (min-width: 320px) {
  .movies-container {
    margin-top: 40px;
    padding: 0px;
  }

  .carousel-container {
    margin-left: 20px;
    margin-top: 20px;
  }
}

@media screen and (min-width: 430px) {
  h1 {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
  }
}

@media screen and (min-width: 540px) {
  h1 {
    font-size: 1.7rem;
  }

  span {
    font-size: 1.7rem;
  }
}

@media screen and (min-width: 650px) {
  h1 {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
}

@media screen and (min-width: 760px) {
  h1 {
    font-size: 1.9rem;
  }

  span {
    font-size: 1.9rem;
  }
}

@media screen and (min-width: 870px) {
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
    margin-top: 100px;
    padding-left: 50px;
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
}

/* Theater attribution: Image by <a href="https://www.freepik.com/free-photo/long-hair-artist-stage_11107899.htm#query=theater&position=14&from_view=search&track=sph">Freepik</a> */
</style>
