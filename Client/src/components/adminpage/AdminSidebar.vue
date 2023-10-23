<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import gsap from 'gsap';

    const isNavOpen = ref(false);
    const navElement = ref<HTMLElement | null>(null)

    function openNav() {
        isNavOpen.value = !isNavOpen.value;

        console.log(isNavOpen.value)
        if (navElement.value) {
            if (isNavOpen.value) {
            gsap.to(navElement, { opacity: 1, x: 0, duration: 0.3 });
            } else {
            gsap.to(navElement, { opacity: 0, x: -100, duration: 0.3 });
            }
        }
    }
</script>

<template>
    <button type="button" class="hamburger-btn" @click="openNav" :class="[isNavOpen ? 'menu-open-right' : '']">
        <span :class="[isNavOpen ? 'span-open' : 'span']" ></span>
        <span :class="[isNavOpen ? 'span-open' : 'span']"></span>
        <span :class="[isNavOpen ? 'span-open' : 'span']"></span>
    </button>
    <button type="button" class="hamburger-btn" @click="openNav" :class="[isNavOpen ? 'menu-open-left' : '']">
        <span :class="[isNavOpen ? 'span-open' : 'span']" ></span>
        <span :class="[isNavOpen ? 'span-open' : 'span']"></span>
        <span :class="[isNavOpen ? 'span-open' : 'span']"></span>
    </button>
    <nav :class="[isNavOpen ? 'expended-nav' : 'nav']" ref="expandedNav">
        <li :class="[isNavOpen ? 'li' : 'hide']"><RouterLink to="/">Trailer</RouterLink></li>
        <li :class="[isNavOpen ? 'li' : 'hide']"><RouterLink to="/">Trailer</RouterLink></li>
        <li :class="[isNavOpen ? 'li' : 'hide']"><RouterLink to="/">Trailer</RouterLink></li>
    </nav>
</template>

<style scoped lang="scss">
    nav {
        transition: all 0.3s ease-in-out;
        left: -100vw;
        width: 100vw;
        height: 100vh;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        position: fixed;
        top: 0;
        visibility: visible;
    }

    .expended-nav {
        transition: all 0.3s ease-in-out;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        position: fixed;
        top: 0;
        visibility: visible;
    }

    .hide {
        display: none;
    }

    .hamburger-btn {
        transition: all 0.3s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;   
        z-index: 1;
    }

    .menu-open-right {
        transition: all 0.3s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 1;
        padding: 0;
        transform: rotate(40deg);
    }
    .menu-open-left {
        transition: all 0.3s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 1;
        padding: 0;
        transform: rotate(-40deg);
    }

    span {
        transition: all 0.3s ease-in-out;
        width: 7px;
        height: 7px;
        margin: 7px;
        border-radius: 7px;
        display: block;
        background-color: #eee;
    }

    .span-open {
        transition: all 0.3s ease-in-out;
        width: 7px;
        height: 7px;
        margin: 7px;
        border-radius: 7px;
        display: block;
    }
</style>
