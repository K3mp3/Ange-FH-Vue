<script setup lang="ts">
    import type { IHamburgerIcon } from '@/models/IHamburgerIcon';
import { ref } from 'vue';
    import { RouterLink } from 'vue-router'

    let screenSize = ref();
    let width = document.documentElement.clientWidth;

    function init() {
        console.log("hej");
        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("resize", controlScreenSize);

        if (width < 910) {
            screenSize.value = true;
        }
    }

    init();

    function controlScreenSize() {
        if (width > 909) {
            console.log("width", width);
            screenSize.value = false;
        } else {
            screenSize.value = true;
        }
    }

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }

    const links: string[] = ["Create room", "About", "Contact", "FAQ"];

    const hamburgerIcon: IHamburgerIcon[] = [
        {dot: document.createElement('span')},
        {dot: document.createElement('span')},
        {dot: document.createElement('span')},
    ]

    function getRoute(link: string) {
        const trimmedLink = link.trim().replace(/\s/g, '').toLowerCase();
        return `/${trimmedLink}`;
    }
</script>
<template>
    <div class="nav-container">
        <div class="logo-container">
            <img src="../../../public/img/AngeFH_rgb.jpg">
        </div>
        <div class="navigation-container">
            <ul :class="{hide: screenSize === true}">
                <li v-for="link in links"><router-link :to="getRoute(link)" class="router-link">{{ link }}</router-link></li>
            </ul>
            <section class="hero-container" id="hero-containerID" :class="{hide: screenSize === false}">
                <span v-for="dot in hamburgerIcon" class="rows"></span>
            </section>
        </div>
    </div>
</template>
<style scoped>
    .nav-container {
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin: auto;
        padding: 20px;
    }

    .hero-container {
        height: 100%;
        width: 67px;
        background-color: blue;
        display: flex;
        flex-direction: column;
        padding: 4px;
        justify-content: center;
    }

    span {
        width: 10px;
        height: 10px;
        display: block;
        border-radius: 50%;
        background-color: #ffffff;
        margin: 2px;
    }

    .logo-container {
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 20px;
    }

    .navigation-container {
        width: 100%;
        display: flex;
        justify-content: end;
    }

    ul {
        display: flex;
        justify-content: space-between;
        justify-content: center;
        align-items: center;
        gap: 60px;
        padding: 20px;
    }

    .hide {
        display: none;
    }

    li {
        list-style: none;
    }

    .router-link {
        text-decoration: none;
    }
</style>