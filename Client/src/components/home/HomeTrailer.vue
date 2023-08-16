<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

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

function settings() {
  return {
    itemsToShow: 1,
		snapAlign: "center"
  }
}

onMounted(async () => {
  getTrailer();

  window.addEventListener("resize", settings);

  settings();
});
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

  .carousel {
    background-color: #ff7b0f;
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
    padding: 0;
}

img {
  max-width: 100%;
  padding: 0;
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
}

@media screen and (min-width: 1200px) {
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
</style>