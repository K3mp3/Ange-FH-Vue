<!-- eslint-disable no-underscore-dangle -->
<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

interface IMovie {
  _id: string;
  title: string;
  poster: string;
  link: string;
}

const movies = ref<IMovie[]>([]);

function settings() {
  return {
    itemsToShow: 1,
		snapAlign: "start"
  }
}

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/movie");
    movies.value = response.data;
  } catch (error) {
    alert(error);
  }

  window.addEventListener("resize", settings);

  settings();
});

const breakpoints = {
  310: {
    itemsToShow: 1.5,
    snapAlign: "start"
  },
  420: {
    itemsToShow: 1.75,
    snapAlign: "start"
  },
  530: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  640: {
    itemsToShow: 2.25,
    snapAlign: "start"
  },
  750: {
    itemsToShow: 2.5,
    snapAlign: "start"
  },
  860: {
    itemsToShow: 3,
    snapAlign: "center"
  },
}

function showClickedMovie(slide: IMovie) {
  window.location.href = `/movie/${slide._id}`
}
</script>

<template>
  <div class="movies-container">
    <div class="carousel-container">
      <h1>Kommande <span>filmer</span></h1>
      <div class="carousel-items-container">
        <carousel :settings="settings" :breakpoints="breakpoints" class="carousel">
        <slide v-for="slide in movies" :key="slide._id" class="slide">
          <div class="carousel__item">
            <!-- <router-link :to="`/movie/${slide._id}`"> -->
            <div class="movie-poster-container">
              <img :src="`http://localhost:3000/movie/image/${slide.poster}`" alt="`${sl}`" @click="() => showClickedMovie(slide)">
              <div class="movie-bottom-container">
                <h6>{{slide.title }}</h6>
                <button type="button" class="see-movie-btn" @click="() => showClickedMovie(slide)">Se nu</button>
              </div>
            </div>
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

h1 {
  font-size: 1.6rem;
  font-weight: 900;
  margin-left: 15px;
  margin-bottom: 20px;
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
  max-width: 860px;
  margin: auto;
}

.carousel__item {
  width: 100%;
	color: white;
	font-size: 20px;
	justify-content: center;
	align-items: center;
  margin-top: 20px;
  margin: auto;
  padding: 0;
}

.movie-poster-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
}

.movie-poster-container:hover {
  cursor: pointer;
}

h6 {
  margin-left: 15px;
}

.see-movie-btn {
  background: transparent;
  border: 1px solid #FF7B0F;
  color: #eeeeee;
  font-size: 0.9rem;
  font-weight: 300;
  width: calc(100% - 30px);
  margin-left: 15px;
  padding: 5px 0;
  border-radius: 20px;
}

.see-movie-btn:hover {
  transition: all 0.1s ease-in-out;
  border: 1px solid #eeeeee;
  cursor: pointer;
}

.carousel__slide {
  display: block;
  padding: 0;
}

img {
  max-width: 100%;
  padding: 0 15px;
}

@media screen and (min-width: 310px) {
  .movies-container {
    padding: 0px;
    overflow-x: hidden;
  }

  .carousel-container {
    margin-top: 20px;
  }
}

@media screen and (min-width: 420px) {
  h1 {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
  }
}

@media screen and (min-width: 530px) {
  h1 {
    font-size: 1.7rem;
  }

  span {
    font-size: 1.7rem;
  }
}

@media screen and (min-width: 640px) {
  h1 {
    font-size: 1.8rem;
  }

  span {
    font-size: 1.8rem;
  }
}

@media screen and (min-width: 750px) {
  h1 {
    font-size: 1.9rem;
  }

  span {
    font-size: 1.9rem;
  }

  .movie-bottom-container {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .see-movie-btn {
    width: 50%;
    margin-right: 15px;
  }
}

@media screen and (min-width: 860px) {

  h1 {
    font-size: 2rem;
  }

  span {
    font-size: 2rem;
  }

  .carousel-container {
    margin-top: 30px;
  }
}

@media screen and (min-width: 1190px) {

  h1 {
    font-size: 2.1rem;
    margin-bottom: 30px;
  }

  span {
    font-size: 2.1rem;
  }

}

@media screen and (min-width: 1700px) {

  h1 {
    font-size: 2.2rem;
  }

  span {
    font-size: 2.2rem;
  }
}

/* Theater attribution: Image by <a href="https://www.freepik.com/free-photo/long-hair-artist-stage_11107899.htm#query=theater&position=14&from_view=search&track=sph">Freepik</a> */
</style>
