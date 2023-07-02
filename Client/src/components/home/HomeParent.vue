<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import { useMovieStore } from '../../stores/movie'
import { storeToRefs } from 'pinia';

interface IMovie {
  _id: string;
  title: string;
  poster: string;
}

const movies = ref<IMovie[]>([]);
const currentSlide = ref(0);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/movie");
    movies.value = response.data;
    console.log(movies.value);
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }
});

const currentSlideObject = (slide: IMovie, index: number) => {
  if (index === currentSlide.value) {
    // Handle the current slide logic here
  }
}

const fullScreenVideo = (index: number) => {
  currentSlide.value = index;
  setTimeout(() => {
    // Handle the full screen video logic here
  }, 500);
}
</script>

<template>
  <div class="min-w-[1200px] relative">
    <Carousel
      ref="carousel"
      v-model="currentSlide"
      :items-to-show="8"
      :items-to-scroll="1"
      :wrap-around="true"
      :transition="500"
      snapAlign="start"
      class="bg-transparent"
    >
      <Slide
        v-for="(slide, index) in movies"
        :key="slide._id"
        class="flex items-center object-cover text-white bg-transparent"
      >
        <div
          class="object-cover h-[100%] hover:brightness-125 cursor-pointer"
          :class="[
            currentSlide !== index ? 'border-4 border-transparent' : 'border-4 border-white',
            currentSlideObject(slide, index)
          ]"
        >
          <img
            style="user-select: none"
            class="pointer-events-none h-[100%] z-[-1]"
            :src="`http://localhost:3000/movie/image/${slide.poster}`"
          >
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.large-container {
  padding-top: 40px;
  margin: auto;
  background-color: aqua;
  overflow: hidden;
}

h1 {
  margin-left: 20px;
  color: #eeeeee;
  margin-bottom: 40px;
}

.medium-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: beige;
  
}

.movies {
  flex: 0 0 auto; /* Prevent flex items from growing */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aquamarine;
  padding: 0 20px;
  text-align: center;
}

img {
  max-height: 300px;
  padding: 0 20px;
  background-color: aquamarine;
}

h3 {
  margin: 5px 0 0 20px;
  color: #eeeeee;
}
</style>
