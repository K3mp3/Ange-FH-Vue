<script setup lang="ts">
    import type { IHamburgerIcon } from "@/models/IHamburgerIcon";
    import { ref } from "vue";
    import { RouterLink } from "vue-router"

    let screenSize = ref();
    let mobileMenuOpen = ref(false);
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
        {dot: document.createElement("span")},
        {dot: document.createElement("span")},
        {dot: document.createElement("span")},
    ]

    function getRoute(link: string) {
        const trimmedLink = link.trim().replace(/\s/g, "").toLowerCase();
        return `/${trimmedLink}`;
    }

    function expandAllDots() {
        const heroContainer = document.getElementById("hero-containerID");
        if (heroContainer) {
            heroContainer.classList.add("expand");
        }
    }

    function shrinkAllDots() {
        const heroContainer = document.getElementById("hero-containerID");
        if (heroContainer) {
            heroContainer.classList.remove("expand");
        }
    }

    function openMobileMenu() {
        const navContainer = document.querySelector(".nav-container");
        const mobileNavigationMenu = document.querySelector(".mobile-navigation-menu");
        console.log("click")
        mobileMenuOpen.value =! mobileMenuOpen.value;
        console.log(mobileMenuOpen.value);
        if(mobileMenuOpen.value === true) {
            navContainer?.classList.add("open")
            console.log(navContainer);
        }

        if(mobileMenuOpen.value === false) {
            shrinkAllDots();
            navContainer?.classList.remove("open")
        }
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
            <section class="hero-container" id="hero-containerID" :class="{ hide: screenSize === false }" @mouseover="expandAllDots" @mouseout="shrinkAllDots" @click="openMobileMenu">                
                <span v-for="dot in hamburgerIcon" class="rows"></span>
            </section>
        </div>
    </div>
    <div class="mobile-navigation-menu">

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

    .mobile-navigation-menu{
        background-color: #d41a1a;
        width: 100%;
        height: 100px;
        left: 0;
        margin-top: 21px;
        position: absolute;
    }

    .logo-container {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .navigation-container {
        width: 100%;
        display: flex;
        justify-content: end;
    }

    .hero-container {
        height: 100%;
        width: 55px;
        display: flex;
        flex-direction: column;
        padding: 4px;
        justify-content: center;
        cursor: pointer;
    }

    span {
        transition: all 0.5s ease-in-out;
        width: 8px;
        height: 8px;
        display: block;
        border-radius: 4px;
        background-color: #ff7b0f;
        margin: 4px;
    }

    .hero-container.expand .rows {
        width: 40px;
        transition: all 0.5s ease-in-out;
        border-radius: 4px;
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