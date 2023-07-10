<script setup lang="ts">
import { ref, toRefs, onMounted, reactive } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const width = document.documentElement.clientWidth;

interface IMovie {
  _id: string;
  title: string;
  poster: string;
}

const movies = ref<IMovie[]>([]);

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

const breakpoints = {
  290: {
    itemsToShow: 1.5,
    snapAlign: "center"
  },
  390: {
    itemsToShow: 1.75,
    snapAlign: "center"
  },
  480: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  570: {
    itemsToShow: 2.25,
    snapAlign: "start"
  },
  660: {
    itemsToShow: 2.5,
    snapAlign: "start"
  },
  750: {
    itemsToShow: 3,
    snapAlign: "start"
  },
  840: {
    itemsToShow: 4,
    snapAlign: "start"
  },
  930: {
    itemsToShow: 5,
    snapAlign: "start"
  },
  1020: {
    itemsToShow: 6,
    snapAlign: "start"
  },
  1120: {
    itemsToShow: 7,
    snapAlign: "start"
  },
  1220: {
    itemsToShow: 8,
    snapAlign: "start"
  },
  1320: {
    itemsToShow: 9,
    snapAlign: "start"
  },
  1520: {
    itemsToShow: 10,
    snapAlign: "start"
  },
  2020: {
    itemsToShow: 11,
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
<div id="app">
	<carousel :settings="settings" :breakpoints="breakpoints" class="carousel">
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
.carousel {
  background-color: aqua;
}
.carousel__item {
  width: 100%;
	background-color: #642afb;
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
  .carousel__item {
    max-height: 411px;
    width: 100%;
  }

  img {
    max-height: 391px;
    max-width: 100%;
  }
}
</style>
