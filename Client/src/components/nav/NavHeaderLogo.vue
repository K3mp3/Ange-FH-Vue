<script setup lang="ts">
    import { ref } from "vue";
    import { RouterLink } from "vue-router"

    const screenSize = ref();
    let width = document.documentElement.clientWidth;

    function controlScreenSize() {
        if (width > 1200) {
            console.log("width", width);
            screenSize.value = false;
        } else {
            screenSize.value = true;
        }
    }

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }   

    function init() {
        console.log("hej");

        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("resize", controlScreenSize);

        updateScreenSize()

        if (width < 910) {
            screenSize.value = true;
        }
    }

    init(); 

    const links: string[] = ["filmer", "event", "om oss", "kontakt"];

    function getRoute(link: string) {
        const trimmedLink = link.trim().replace(/\s/g, "").toLowerCase();
        return `/${trimmedLink}`;
    }
</script>

<template>
    <div class="nav-top-container">
        <div class="logo-container">
            <img src="../../../public/img/AngeFh-logo.png" alt="square icon with blue and yellow 'propellers' and the organisation name to the left"/>
        </div>
        
        <div class="link-container">
            <ul :class="{hide: screenSize === true}">
                <li v-for="link in links"><router-link :to="getRoute(link)" class="router-link">{{ link }}</router-link></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .nav-top-container {
        display: flex;
    }

    .logo-container {
    }

    img {
        max-width: 8rem;
    }

    .link-container {
        width: 100%;
        display: flex;
        justify-content: end;
    }

    .hide {
        display: none;
    }

    ul {
        display: flex;
        justify-content: space-between;
        justify-content: center;
        align-items: center;
        gap: 60px;
        padding-right: 20px;
    }

    li {
        list-style: none;
    }

    .router-link {
        text-decoration: none;
        color: #fff;
    }
</style>