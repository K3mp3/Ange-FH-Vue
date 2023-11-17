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
        scroll(width + 10)    
        
        if (width >= 360) scroll(width + 16)
    }

    function scrollLeft() {
         updateScreenSize();

        scroll(-width - 10)

        if (width >= 360) scroll(-width - 16)
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

    onMounted(() => {
        getTrailer();
        updateScreenSize()
        scrollContainer.value = document.querySelector('.media-container');
    })
</script>

<template>
    <div class="scroll-buttons">
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
            <!-- <div class="trailer-info">
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
            </div> -->
        </div>
    </div>
</template>
  
<style scoped lang="scss">
    h2 {
        font-family: Arial;
        color: #F1F1F1;
        font-weight: 700;
        font-size: 1.2rem;
    }
    .media-container {
        width: 100%;
        display: flex;
        overflow: auto;
        gap: 10px;
        background-color: #FF7B0F;

        .slide-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
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
            gap: 15px;

            .slide-container {

                .image-container {
                    width: calc(50vw - 7px);
                    /* max-width: 310px; */
                    height: 25vw;
                    /* max-height: 170px; */
                }
            }
        }
    }

    @media screen and (min-width: 660px) {
        .media-container {

            .slide-container {
                .image-container {
                    width: calc(33.33vw - 10px);
                    /* max-width: 310px; */
                    height: 16.5vw;
                    /* max-height: 170px; */
                }
            }
        }
    }

    @media screen and (min-width: 1090px) {
        .media-container {
            padding: 0px 20px;
            gap: 20px;
            .slide-container {

                .image-container {
                    width: calc(25vw - 25px);
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
                    /* max-width: 310px; */
                    height: 10vw;
                    /* max-height: 170px; */
                }
            }
        }
    }
</style>