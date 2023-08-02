<script setup lang="ts">
    import { ref } from "vue";
    import { RouterLink } from "vue-router"
    import gsap from "gsap"; 
    import type { ImobileNavLinks } from "@/models/ImobileNavLinks";

    import movieIcon from "../../../public/img/nav-icons/popcorn.png"
    import eventIcon from "../../../public/img/nav-icons/calendar.png"
    import homeIcon from "../../../public/img/nav-icons/home.png"
    import infoIcon from "../../../public/img/nav-icons/id-card.png"
    import contactIcon from "../../../public/img/nav-icons/faq.png"

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
        <ul>
            <li><router-link to="movies" class="mobile-nav-icon"><img :src="movieIcon" alt="Movie Icon" class="nav-icon" /></router-link></li>
            <li><router-link to="movies" class="mobile-nav-icon"><img :src="eventIcon" alt="Movie Icon" class="nav-icon" /></router-link></li>
            <li><router-link to="home" class="mobile-nav-logo"><img :src="homeIcon" alt="Home icon"/></router-link></li>
            <li><router-link to="movies" class="mobile-nav-icon"><img :src="infoIcon" alt="Movie Icon" class="nav-icon" /></router-link></li>
            <li><router-link to="movies" class="mobile-nav-icon"><img :src="contactIcon" alt="Movie Icon" class="nav-icon" /></router-link></li> 
        </ul>
    </div>
</template>

<style scoped>
    .nav-container {
        width: calc(100% - 2rem);
        background-color: #292929;
        display: flex;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    ul {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 10px;
        padding: 15px 0px;
    } 

    img {
        max-width: 2rem;
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


    .hide {
        display: none;
    }

    li {
        list-style: none;
    }

    .router-link {
        text-decoration: none;
    }

    
    @media screen and (min-width: 430px) {
        ul {
            gap: 9px;
            padding: 13px 0px;
        } 

        img {
            max-width: 2.2rem;
        }
    }

    @media screen and (min-width: 540px) {
        .nav-container {
            width: calc(100% - 2.1rem);
        }

        ul {
            gap: 8px;
            padding: 12px 0px;
        } 

        img {
            max-width: 2.3rem;
        }
    }

    @media screen and (min-width: 650px) {
        .nav-container {
            width: calc(100% - 2.2rem);
        }

        ul {
            gap: 7px;
            padding: 11px 0px;
        } 

        img {
            max-width: 2.4rem;
        }
    }

    @media screen and (min-width: 760px) {
        .nav-container {
            width: calc(100% - 2.3rem);
        }

        ul {
            gap: 6px;
            padding: 10px 0px;
        } 

        img {
            max-width: 2.5rem;
        }
    }

    /* Home attribution image: <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Abdul-Aziz - Flaticon</a> */
    /* Popcorn attribution image: <a href="https://www.flaticon.com/free-icons/food-and-restaurant" title="food and restaurant icons">Food and restaurant icons created by Abdul-Aziz - Flaticon</a> */
    /* Events attribution image: <a href="https://www.flaticon.com/free-icons/follow-up" title="follow up icons">Follow up icons created by Abdul-Aziz - Flaticon</a> */
    /* Info attribution image: <a href="https://www.flaticon.com/free-icons/faq" title="faq icons">Faq icons created by Abdul-Aziz - Flaticon</a> */
    /* Contact attribution image: <a href="https://www.flaticon.com/free-icons/contact-information" title="contact information icons">Contact information icons created by Abdul-Aziz - Flaticon</a> */
</style>