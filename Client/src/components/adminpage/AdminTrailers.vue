<script setup lang="ts">
    import type { ITrailer } from '@/models/ITrailers';
    import getTrailers from '@/services/trailerService';
    import { onMounted, ref } from 'vue';
    import 'vue3-carousel/dist/carousel.css'
    import gsap from 'gsap';
    import debounce from 'lodash/debounce';

    const trailers = ref<ITrailer[]>([]);
    const scrollContainer = ref<HTMLElement | null>(null);
    const canScrollRight = ref(true);
    const activateLeftClick = ref(false);
    const numberOfClicksRight = ref(0);
    const numberOfClicksLeft = ref(0);
    const isRightButtonDisabled = ref(false);
    const isLeftButtonDisabled = ref(false);

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }

    const scroll = (scrollWidth: number) => {
        if (scrollContainer.value) {
            gsap.to(scrollContainer.value, { scrollLeft: scrollContainer.value.scrollLeft + scrollWidth, 
                duration: 0.6, 
                ease: "power2.inOut" 
            });
        }
    };

    function rightScroll() {
        numberOfClicksRight.value += 1;
        numberOfClicksLeft.value += 1;

        if (width >= 1090) {
            numberOfClicksRight.value += 2;
            numberOfClicksLeft.value += 2;
            console.log(numberOfClicksRight.value)
            if (numberOfClicksRight.value === ((trailers.value.length - 3))) canScrollRight.value = false;
            return;
        }

        if (width >= 1530) {
            numberOfClicksRight.value += 3;
            numberOfClicksLeft.value += 3;
            console.log(numberOfClicksRight.value)
            if (numberOfClicksRight.value === ((trailers.value.length - 4))) canScrollRight.value = false; 
            return;
        }
        
       

        if (width >= 660) {
            if (numberOfClicksRight.value === ((trailers.value.length - 1) / 2)) canScrollRight.value = false;
            return;
        }

        if (numberOfClicksRight.value > 0) activateLeftClick.value = true;
        if (numberOfClicksRight.value === (trailers.value.length - 1)) canScrollRight.value = false;
    }

    function leftScroll() {
        numberOfClicksRight.value -= 1;
        numberOfClicksLeft.value -= 1;

        if (width >= 660) {
            console.log("hej")
        }

        if (numberOfClicksLeft.value === 0) activateLeftClick.value = false;
        if (numberOfClicksLeft.value > 0) canScrollRight.value = true;
    }

    function scrollRight() {
        if (isRightButtonDisabled.value) return

        isRightButtonDisabled.value = true;

        rightScroll();

        updateScreenSize();
        scroll(width + 10) 
        
        if (width >= 360) scroll(width * 0.92)
        if (width >= 660) scroll(width * 0.954)  
        if (width >= 1090) scroll(width * 0.91)
        if (width >= 1530) scroll(width * 0.9325)

        setTimeout(() => {
            isRightButtonDisabled.value = false;
        }, 600);
    }

    function scrollLeft() {
        if (isLeftButtonDisabled.value) return

        isLeftButtonDisabled.value = true;

        leftScroll()

        updateScreenSize();
        scroll(- width - 10)    

        if (width >= 360) scroll(- width * 0.92)
        if (width >= 660) scroll(- width * 0.954)   
        if (width >= 1090) scroll(- width * 0.91)   
        if (width >= 1090) scroll(- width * 0.91) 

        setTimeout(() => {
            isLeftButtonDisabled.value = false;
        }, 600);
    }

    async function getTrailer() {
        try {
        const response = await getTrailers();
        trailers.value = response;

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
        updateScreenSize();
        scrollContainer.value = document.querySelector('.media-container');
    })
</script>

<template>
    <div class="media-container">
        <div v-for="index in trailers" :key="index._id" class="slide-container">
            <div class="image-container">
                <div class="scroll-buttons"> 
                    <button type="button" v-if="activateLeftClick" class="scroll-left" @click="scrollLeft()"><FontAwesome :icon="['fas', 'chevron-left']" class="fontawesom-icon" /></button>
                    <button type="button" v-if="canScrollRight" class="scroll-right" @click="scrollRight()" :disabled="isRightButtonDisabled"><FontAwesome :icon="['fas', 'chevron-right']" class="fontawesom-icon" /></button>
                </div>
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
    </div>
</template>
  
<style scoped lang="scss">
    h2 {
        font-family: Arial;
        color: #F1F1F1;
        font-weight: 700;
        font-size: 1.2rem;
    }

    .fontawesom-icon {
        color: #F1F1F1;
    }

    .media-container {
        width: 100%;
        display: flex;
        overflow: auto;
        gap: 10px;
        background-color: #FF7B0F;

        .scroll-left {
            width: 30px;
            background-color: rgb(23, 23, 23, 0.1);
            border: none;
            position: absolute;
            left: 15px;
            height: calc(50vw - 20px);
        }

        .scroll-right {
            width: 30px;
            background-color: rgb(23, 23, 23, 0.1);
            border: none;
            position: absolute;
            right: 15px;
            height: calc(50vw - 20px);
        }

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
                padding-left: 15px;
                margin-top: 10px;
                text-align: left;
                display: flex;
                flex-direction: column;
                gap: 10px;

                ul {
                    display: flex;
                    gap: 11px;
                    padding: 0;
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
            gap: 1vw;

            .scroll-left {
                height: calc(40vw - 20px);
            }

            .scroll-right {
                height: calc(40vw - 20px);
            }

            .slide-container {

                .image-container {
                    width: calc(90.9vw);
                    height: 40vw;
                }
            }
        }
    }

    @media screen and (min-width: 660px) {
        .media-container {

            .scroll-left {
                height: calc(22.5vw - 20px);
            }

            .scroll-right {
                height: calc(22.5vw - 20px);
            }

            .slide-container {
                .image-container {
                    width: calc(46.619vw);
                    height: 22.5vw;
                }
            }
        }
    }

    @media screen and (min-width: 1090px) {
        .media-container {
            padding-left:5vw;
            gap: 1vw;

            .scroll-left {
                height: calc(15vw - 20px);
            }

            .scroll-right {
                height: calc(15vw - 20px);
            }
            .slide-container {
                /* margin-left: 20px; */

                .image-container {
                    width: calc(29.32vw);
                    height: 15vw;
                    padding: 10px 15px;
                }
            }
        }
    }

    @media screen and (min-width: 1530px) {
        .media-container {
            margin: auto;

            .scroll-left {
                height: calc(11vw - 20px);
            }

            .scroll-right {
                height: calc(11vw - 20px);
            }
            .slide-container {

                .image-container {
                    width: calc(22.17vw);
                    height: 11.585vw;
                }
            }
        }
    }

    @media screen and (min-width: 1980px) {
        .media-container {
            margin: auto;

            .scroll-left {
                height: calc(9vw - 20px);
            }

            .scroll-right {
                height: calc(9vw - 20px);
            }
            .slide-container {

                .image-container {
                    width: calc(17.627vw);
                    height: 8.81vw;
                }
            }
        }
    }

    @media screen and (min-width: 2440px) {
        .media-container {
            margin: auto;

            .scroll-left {
                height: calc(7.5vw - 20px);
            }

            .scroll-right {
                height: calc(7.5vw - 20px);
            }
            .slide-container {

                .image-container {
                    width: calc(15vw);
                    height: 7.5vw;
                }
            }
        }
    }
</style>