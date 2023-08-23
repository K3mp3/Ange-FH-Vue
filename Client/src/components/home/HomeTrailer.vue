<!-- eslint-disable no-underscore-dangle -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

let modifiedSlide = "";

let trailerClosed = ref(true);
let showChosenTrailer = ref("");

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

function showTrailer(slide: ITrailer) {
  modifiedSlide = slide._id;
  trailerClosed.value = false;
  
  console.log("url", slide.link);
  showChosenTrailer.value = slide.link
}

function closeIframeContainer() {
  trailerClosed.value = true;
  showChosenTrailer.value = "";
}
</script>

<template>
    <div class="movie-trailer-container">
      <div class="carousel-items-container">
        <carousel :settings="settings" class="carousel">
        <slide v-for="slide in trailers" :key="slide._id" class="slide">
          <div class="play-btn-container">
            <button type="button" class="secondary-btn" @click="() => showTrailer(slide)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="link-img"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" class="link-img-path"/></svg>
            </button>
          </div>
          <!-- <div class="buttons-container">
            <button type="button" class="secondary-btn"><a href="http://folketshus-ange.internetbokningen.com/chap/bookforestall/">Köp biljetter</a></button>
          </div> -->

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
    </div>
    <div v-for="slide in trailers" :key="slide._id" class="iframe-container" @click="closeIframeContainer" :class="{ hide: trailerClosed }">
    <iframe :src="showChosenTrailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>

</template>

<style scoped>
.hide {
  display: none;
}
.carousel__slide {
  flex-direction: column;
}
.carousel__prev, 
  .carousel__next, 
  .carousel__prev:hover, 
  .carousel__next:hover {
      color: white;
  }

.play-btn-container {
  display: flex;
  padding: 20px 30px;
  gap: 15px;
  position: absolute;
}

.link-img {
  max-width: 20px;
  margin-left: 2px;
}

.link-img-path {
  max-width: 20px;
  fill: #ff7b0f;
}

.buttons-container {
  display: flex;
  padding: 20px 30px;
  gap: 15px;
}

a {
  color: #fff;
  text-decoration: none;
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
  width: 55px;
  height: 55px;
  font-size: 1rem;
  font-weight: 100;
  border-radius: 40px;
}

button:hover {
  cursor: pointer;
}

img {
  max-width: 100%;
  padding: 0;
}

.iframe-container {
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: rgb(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1;
  top: 0;
}

iframe {
  width: 90%;
  height: calc(90% * 0.56);
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  iframe {
    width: 800px;
    height: calc(800px * 0.56);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media screen and (min-width: 1200px) {
  .carousel__item {
    max-height: 750px;
    overflow: hidden;
  }

  .buttons-container {
    width: 95%;
    display: flex;
    justify-content: end;
    position: absolute;
    z-index: 1;
    margin: auto;
    bottom: 40px;
    right: 50px;
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

  img {
    width: 100vw;
    padding: 0;
  }

  iframe {
    width: 1000px;
    height: calc(1000px * 0.56);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>