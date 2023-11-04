<script setup lang="ts">
    import type { ITrailer } from '@/models/ITrailers';
    import getTrailers from '@/services/trailerService';
    import { onMounted, ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Navigation  } from 'vue3-carousel'

    const trailers = ref<ITrailer[]>([]);

    async function getTrailer() {
        try {
        const response = await getTrailers();
        trailers.value = response;

        console.log(trailers.value);
        } catch (error) {
            alert(error);
        }
    }

    const carouselSettings = ref({
        itemsToShow: 1,
        snapAlign: 'start',
    });

    onMounted(() => {
        getTrailer();
    })
</script>

<template>
    <div class="carousel-container">
      <Carousel :settings="carouselSettings">
        <Slide v-for="slide in trailers" :key="slide._id">
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
  .carousel-container {
    width: 100%; /* Adjust the width as needed */
    overflow: hidden;

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
        border: 5px solid white;
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
        z-index: 1;
        position: absolute;
        width: 100vw;
        min-height: 40px;
        display: flex;
        justify-content: center;
        margin-top: -40px;
        background-image: linear-gradient(to bottom, rgba(255,0,0,0), rgba(9, 15, 32,1));
    }

    h1 {
        font-size: 1.4rem;
        color: #fff;
        font-weight: 700;
    }
  }
</style>