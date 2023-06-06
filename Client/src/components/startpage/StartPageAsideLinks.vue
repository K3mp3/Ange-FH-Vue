<script setup lang="ts">
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