<script setup lang="ts">
    import type { IHamburgerIcon } from "@/models/IHamburgerIcon";
    import { ref } from "vue";
    import { RouterLink } from "vue-router"
    import gsap from "gsap"; 

    let screenSize = ref();
    let mobileMenuOpen = ref(false);
    let width = document.documentElement.clientWidth;
    
    const menuTransitionDuration = 0.5; // Adjust as needed
    
    function init() {
        console.log("hej");

        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("resize", controlScreenSize);

        updateScreenSize()

        if (width < 910) {
            screenSize.value = true;
        } else {
            screenSize.value = false;
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

    function mouseEnterAnimation() {
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn") as HTMLButtonElement;
        const dots = mobileMenuBtn.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
        console.log("enter")
        gsap.to(dots, { width: "38px", duration: 0.1 });    
    }

    function mouseLeaveAnimation() {
         const mobileMenuBtn = document.querySelector(".mobile-menu-btn") as HTMLButtonElement;
        const dots = mobileMenuBtn.querySelectorAll(".dot") as NodeListOf<HTMLElement>;
        console.log("enter")
        gsap.to(dots, { width: "6px", duration: 0.1 }); 
    }

    const emit = defineEmits(['toggle']);
    function emitMobileMenu() {
        mobileMenuOpen.value = !mobileMenuOpen.value;
        emit("toggle", mobileMenuOpen.value)
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
            <button class="mobile-menu-btn" :class="{ hide: screenSize === false }" @click="emitMobileMenu" @mouseenter="mouseEnterAnimation" @mouseleave="mouseLeaveAnimation">                
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </button>
        </div>
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
        position: relative;
        z-index: 1;
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

    .mobile-menu-btn {
        height: 100%;
        width: 55px;
        display: flex;
        flex-direction: column;
        padding: 4px;
        justify-content: center;
        cursor: pointer;
    }

    button {
        background-color: transparent;
        border: none;
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