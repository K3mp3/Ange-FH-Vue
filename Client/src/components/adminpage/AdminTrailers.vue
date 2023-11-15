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

        console.log(trailers.value)
        } catch (error) {
            alert(error);
        }
    }

    const formatReleaseDate = (dateString: string | Date): string => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

        if (!(date instanceof Date && !Number.isNaN(date.getTime()))) {
            // Handle invalid date here if needed
            return 'Invalid Date';
        }

        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        return formattedDate;
    };

    const formatDuration = (duration: string | number): string => {
    // If duration is a string, parse it into hours and minutes
    if (typeof duration === 'string') {
      const [hoursStr, minutesStr] = duration.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      // Check if parsing is successful
      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return 'Invalid Duration';
      }

      return `${hours}h ${minutes}min`;
    }

    // If duration is a number, assume it's already in minutes
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedDuration = `${hours}h ${minutes}min`;

    return formattedDuration;
  };

  function settings() {
  return {
    itemsToShow: 1,
      snapAlign: 'center',
  }
}

    const breakpoints = {
        700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    }

    onMounted(() => {
        getTrailer();
    })
</script>

<template>
    <div class="carousel-container">
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in trailers" :key="slide._id">
            <div class="image-container">
                <img
                    :src="`http://localhost:3000/trailer/image/${slide.poster}`"
                    :alt="slide.title"
                />
            </div>
            <div class="trailer-info">
                <h2>{{ slide.title }}</h2>
                <ul>
                    <li>{{ slide.genre }}</li>
                    <li>{{ slide.age }}</li>
                    <li v-if="slide.duration">{{ formatDuration(slide.duration) }}</li>
                </ul>
                <ul>
                    <li class="white-li">{{ formatReleaseDate(slide.date) }}</li>
                    <li class="white-li">|</li>
                    <li class="white-li">{{ slide.time }}</li>
                </ul>
                <button type="submit">                
                <FontAwesome  class="fontawesome-icon" :icon="['fas', 'trash']" />
                    Delete
                </button>
            </div>
        </Slide>
        <template #addons>
          <navigation />
        </template>
      </Carousel>
    </div> 
</template>
  
<style scoped lang="scss">
    h2 {
        font-family: Arial;
        color: #F1F1F1;
        font-weight: 700;
        font-size: 1.2rem;
    }

  .carousel-container {
    width: 100%;
    overflow: hidden;

    .carousel__item {
        width: 100%;
        color: #F1F1F1;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        margin: auto;
        padding: 0;
    }
    
    .carousel__slide {
        display: block;
    }
    
    .carousel__prev,
    .carousel__next {
        box-sizing: content-box;
        border: 5px solid #F1F1F1
    }

    .image-container {
        width: 75vw;
        height: 40vw;
        border-radius: 8px;
        border: 1px solid #2C2C2C;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .trailer-info {
        margin-top: 10px;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 10px;

        ul {
            display: flex;
            gap: 11px;
            padding: 0;

            li {
                list-style: none;
                font-family: Arial;
                color: #FF7B0F; 
            }

            .white-li {
                list-style: none;
                font-family: Arial;
                color: #F1F1F1
            }
        }

        button {
            width: 110px;
            border-radius: 20px;
            border: none;
            display: flex;
            gap: 5px;
            padding: 10px;
            align-items: center;
            justify-content: center;
            background-color: #ff7b0f;
            font-family: Verdana;
            color: #F1F1F1;
            margin-bottom: 10px;
        }
    }  
  }
</style>