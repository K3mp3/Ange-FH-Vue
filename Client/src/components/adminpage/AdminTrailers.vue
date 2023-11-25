<script setup lang="ts">
    import type { ITrailer } from '@/models/ITrailers';
    import getTrailers from '@/services/trailerService';
    import { onMounted, ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Navigation  } from 'vue3-carousel'
    import gsap from 'gsap';

    const trailers = ref<ITrailer[]>([]);
    const scrollContainer = ref<HTMLElement | null>(null);

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }

    const scroll = (scrollWidth: number) => {
        console.log(scrollWidth);
        if (scrollContainer.value) {
            gsap.to(scrollContainer.value, { scrollLeft: scrollContainer.value.scrollLeft + scrollWidth, duration: 0.4 });
        }
    };

    function scrollRight() {
        updateScreenSize();
        scroll(width)  
        
        if (width >= 360) scroll(width - 33)
        // if (width >= 1090) scroll(width + 20)
    }

    function scrollLeft() {
         updateScreenSize();

        scroll(-width - 10)

        if (width >= 360) scroll(-width)
        
    }

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
        360: {
            itemsToShow: 2,
            snapAlign: 'start',
        },

        660: {
            itemsToShow: 3.5,
            snapAlign: 'center',
        },

        960: {
            itemsToShow: 5.5,
            snapAlign: 'center',
        },

        1260: {
            itemsToShow: 7.5,
            snapAlign: 'center',
        },

        3000: {
            itemsToShow: 9.5,
            snapAlign: 'center',
        },
    }

    onMounted(() => {
        getTrailer();
        updateScreenSize()
        scrollContainer.value = document.querySelector('.media-container');
    })
</script>

<template>
    <!-- <div class="scroll-buttons">
        <button type="button" @click="scrollLeft()">Scroll Left</button>
        <button type="button" @click="scrollRight()">Scroll Right</button>
    </div>
    <div class="media-container">
        <div v-for="index in trailers" :key="index._id" class="slide-container">
            <div class="image-container">
                <img
                    :src="`http://localhost:3000/trailer/image/${index.poster}`"
                    :alt="index.title"
                />
            </div>
            <div class="trailer-info">
                <h2>{{ index.title }}</h2>
                <ul>
                    <li>{{ index.genre }}</li>
                    <li>{{ index.age }}</li>
                    <li v-if="index.duration">{{ formatDuration(index.duration) }}</li>
                </ul>
                <ul>
                    <li class="white-li">{{ formatReleaseDate(index.date) }}</li>
                    <li class="white-li">|</li>
                    <li class="white-li">{{ index.time }}</li>
                </ul>
                <button type="submit">                
                <FontAwesome  class="fontawesome-icon" :icon="['fas', 'trash']" />
                    Delete
                </button>
            </div>
        </div>
    </div> -->
    <div class="carousel-container">
      <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
        <Slide v-for="slide in trailers" :key="slide._id">
            <div class="slider-container">
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
                        <li>{{ `${slide.age} years` }}</li>
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
            </div>
        </Slide>
        <template #addons>
          <navigation />
        </template>
      </Carousel>
    </div> 
</template>
  
<style scoped lang="scss">
    /* h2 {
        font-family: Arial;
        color: #F1F1F1;
        font-weight: 700;
        font-size: 1.2rem;
    }
    .media-container {
        width: 100%;
        display: flex;
        overflow: auto;
        background-color: #FF7B0F;

        .slide-container {
            display: flex;
            flex-direction: column;
            background-color: aquamarine;
            .image-container {
                width: calc(100vw);
                height: 50vw;
                border-radius: 8px;
                background-color: aqua;
                padding: 10px 15px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                }
            }
            .trailer-info {
                padding-left: 1px;
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
    }

    @media screen and (min-width: 360px) {
        .media-container {
            padding-left: 15px;
            .slide-container {

                border: 1px solid red;
                .image-container {
                    width: calc(50vw - 18px);
                    height: 25vw;
                    padding: 5px 5px;
                }
            }
        }
    }

    @media screen and (min-width: 660px) {
        .media-container {

            .slide-container {
                .image-container {
                    width: calc(33.33vw - 2px);
                    height: 16.5vw;
                }
            }
        }
    }

    @media screen and (min-width: 1090px) {
        .media-container {
            padding: 0px 0px 0px 20px;
            .slide-container {

                .image-container {
                    width: calc(25vw - 7px);
                    height: 12.5vw;
                    padding: 10px 15px;
                }
            }
        }
    }

    @media screen and (min-width: 1550px) {
        .media-container {
            margin: auto;
            .slide-container {

                .image-container {
                    width: calc(20vw - 24px);
                    height: 10vw;
                }
            }
        }
    } */
    h2 {
        font-family: Arial;
        color: #F1F1F1;
        font-weight: 700;
        font-size: 1.2rem;
    }

  .carousel-container {
    width: 100%;
    overflow: hidden;
    
    .carousel__slide {
        display: block;
    }
    
    .carousel__prev,
    .carousel__next {
        box-sizing: content-box;
        border: 5px solid #F1F1F1
    }

    .slider-container {
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        width: 100vw;

        .image-container {
            width: 100%;
            height: 50vw;
            border-radius: 8px;
            border: 1px solid #2C2C2C;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
        }
    }

    .trailer-info {
        width: 100%;
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

    @media screen and (min-width: 360px) {
        .carousel-container {
            background-color: #FF7B0F;

            .slider-container {
                width: calc(50vw - 18px);
                border: 1px solid red;
                margin: auto;

                .trailer-info {
                    background-color: #47ff0f;
                    width: 100%;
                    margin-top: 10px;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    ul {
                        display: flex;
                        flex-direction: row;
                        gap: 10px;
                        padding: 0;
                        background-color: brown;
                        flex-wrap: wrap;

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
                }
                
                .image-container {
                    width: calc(50vw - 22px);
                    height: 25vw;
                    display: flex;
                    align-items: center;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 660px) {
        .carousel-container {

            .slider-container {
                width: calc(28.57vw - 18px);
                border: 1px solid red;
                margin: auto;

                .image-container {
                    width: calc(28.57vw - 22px);
                    height: 16.5vw;
                    display: flex;
                    align-items: center;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 960px) {
        .carousel-container {

            .slider-container {
                width: calc(18.18vw - 18px);
                border: 1px solid red;
                margin: auto;

                .image-container {
                    width: calc(18.18vw - 22px);
                    height: 9.9vw;
                    display: flex;
                    align-items: center;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 960px) {
        .carousel-container {

            .slider-container {
                width: calc(13.33vw - 18px);
                border: 1px solid red;
                margin: auto;

                .image-container {
                    width: calc(13.33vw - 22px);
                    height: 6.665vw;
                    display: flex;
                    align-items: center;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 3000px) {
        .carousel-container {

            .slider-container {
                width: calc(10.52vw - 18px);
                border: 1px solid red;
                margin: auto;

                .image-container {
                    width: calc(10.52vw - 22px);
                    height: 5.26vw;
                    display: flex;
                    align-items: center;

                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>