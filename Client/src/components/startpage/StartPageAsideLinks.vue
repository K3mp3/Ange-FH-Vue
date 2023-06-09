<script setup lang="ts">
    import type { IHamburgerIcon } from "@/models/IHamburgerIcon";
    import { ref } from "vue";
    import { RouterLink } from "vue-router"
    import gsap from "gsap"; 
    import { onMounted } from "vue";

    let screenSize = ref();
    let mobileMenuOpen = ref(false);
    let menuOnLoad = ref(false);
    let width = document.documentElement.clientWidth;
    
    const menuTransitionDuration = 0.5; // Adjust as needed
    
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
        const trimmedLink = link.trim().replace(/\s/g, "").toLowerCase();
        return `/${trimmedLink}`;
    }

    function openMobileMenu() {
        const span = document.querySelector(".dot");
        const heroContainer = document.querySelector('.hero-container') as HTMLDivElement;
        const mobileNavMenu = document.querySelector(".mobile-navigation-menu") as HTMLDivElement;

        gsap.to(mobileNavMenu, {
                x: width,
                opacity: 0,
                onComplete: () => {
                    mobileNavMenu.style.pointerEvents = "auto"; // Enable menu interactions
                },
        });

        mobileMenuOpen.value =! mobileMenuOpen.value;

        if (mobileMenuOpen.value) {
            menuOnLoad.value = true;
            heroContainer.classList.add("expand");
            gsap.to(mobileNavMenu, {
                x: 0,
                duration: menuTransitionDuration,
                opacity: 1,
                onComplete: () => {
                    mobileNavMenu.style.pointerEvents = "auto"; // Enable menu interactions
                },
            });
        } else {
            mobileNavMenu.style.pointerEvents = "none"; // Disable menu interactions
            gsap.to(mobileNavMenu, {
                x: width,
                duration: menuTransitionDuration,
                opacity: 0,
                onComplete: () => {
                heroContainer.classList.remove("expand");
                },
            });
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
            <div class="hero-container" id="hero-containerID" :class="{ hide: screenSize === false }" @click="openMobileMenu">                
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    </div>
    <div class="mobile-navigation-menu">
        <ul class="mobile-menu">
            <li v-for="link in links"><router-link :to="getRoute(link)" class="router-link">{{ link }}</router-link></li>
        </ul>
    </div>
</template>
<style scoped>
    :root {
        --menu-transition-duration: ${menuTransitionDuration}s;
    }
    .nav-container {
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin: auto;
    }

    .mobile-navigation-menu {
        padding: 20px;
        margin-top: 20px;
        background-color: aqua;
        position: absolute;
        right: 0;
    }

    .mobile-menu {
        display: flex;
        flex-direction: column;
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
        width: 6px;
        height: 6px;
        display: block;
        border-radius: 4px;
        background-color: #ff7b0f;
        margin: 4px;
    }

    .hero-container.expand .dot {
        transition: all 0.5s ease-in-out;
        width: 38px;
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