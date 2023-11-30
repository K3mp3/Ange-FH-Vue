<script setup lang="ts">
    import type { ITrailer } from '@/models/ITrailers';
    import getTrailers from '@/services/trailerService';
    import { onMounted, ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Navigation  } from 'vue3-carousel'

    const trailers = ref<ITrailer[]>([]);
    const trailerClosed = ref(true);
    const showChosenTrailer = ref("");

    async function getTrailer() {
        try {
        const response = await getTrailers();
        trailers.value = response;

        console.log(trailers.value);
        } catch (error) {
            alert(error);
        }
    }

    function showTrailer(slide: ITrailer) {
      trailerClosed.value = false;
      showChosenTrailer.value = `${slide.link}?rel=1&autoplay=1`;
    } 

    function closeIframeContainer() {
      trailerClosed.value = true;
      showChosenTrailer.value = "";
    }

    onMounted(() => {
        getTrailer();
    })
</script>

<template>
    <div class="embeded-container" @click="closeIframeContainer()" @keydown="closeIframeContainer()" :class="{ hide: trailerClosed }">
      <iframe :src="showChosenTrailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="carousel-container">
      <Carousel>
        <Slide v-for="slide in trailers" :key="slide._id">
            <div class="play-btn-container">
              <button type="button" @click="showTrailer(slide)"><FontAwesome :icon="['fas', 'play']" class="fa-icon"/></button>
            </div>
            <div class="image-container">
                <img
                    :src="`http://localhost:3000/trailer/image/${slide.poster}`"
                    :alt="slide.title"
                />
            </div>
            <div class="text-container">
                <h1>{{ slide.title }}</h1>
            </div>
        </Slide>
        <template #addons>
          <navigation />
        </template>
      </Carousel>
    </div>
    
</template>
  
<style scoped lang="scss">
.hide {
  display: none;
}
.embeded-container {
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: rgb(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1;
  top: 0;    

  iframe {
    width: 80vw;
    height: 40vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.title-container {
    height: 50px;
    background-color: #151e357f;
}

.carousel-container {
  width: 100%; /* Adjust the width as needed */
  overflow: hidden;

  .play-btn-container {
    width: 100vw;
    height: 50vw;
    max-height: 665px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      border: none;
      background: transparent;
    }

    .fa-icon {
      color: #EEE;
      height: 35px;
    }
  }

  .carousel__item {
      height: 40vw;
      width: 100%;
      background-color: blue;
      color: var(--vc-clr-white);
      font-size: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .carousel__slide {
      display: block;
  }
  
  .carousel__prev,
  .carousel__next {
      box-sizing: content-box;
      border: 5px solid #EEE;
  }

  .image-container {
      background-color: aquamarine;
      width: 100vw;
      height: 50vw;
  }

  img {
      width: 100vw;
      height: 50vw;
      object-fit: cover;
  }

  .text-container {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 12vw;
    max-height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(23, 23, 23, 0), rgba(23, 23, 23, 0.5), rgba(23, 23, 23,1));
    
    h1 {
        font-size: 1.1rem;
        color: #EEE;
        font-weight: 700;
    }
}
}

@media screen and (min-width: 360px) {
  .carousel-container {

    .text-container {

      h1 {
        font-size: 1.3rem;
      }
    }
  }
}

@media screen and (min-width: 660px) {
  .carousel-container {
    max-height: 665px;

    .carousel__item {
      max-height: 665px;
    }

    .image-container {
      max-height: 665px;

      img {
        max-height: 665px;
      }
    }

    .text-container {


      h1 {
        font-size: 1.7rem;
      }
    }
  }
}
</style>