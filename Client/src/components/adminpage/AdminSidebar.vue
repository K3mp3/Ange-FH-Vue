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
    <transition name="slide" mode="out-in">
        <div class="nav-content" :class="[isNavOpen ? 'expended-nav' : 'nav']" ref="expandedNav">
            <div class="nav-admin-links">
                <ul>
                    <li><RouterLink to="/" class="admin-nav-link"><svg height="19" viewBox="0 0 576 512" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64v64c0 8.8-7.4 15.7-15.7 18.6C541.5 217.1 528 235 528 256s13.5 38.9 32.3 45.4c8.3 2.9 15.7 9.8 15.7 18.6v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320c0-8.8 7.4-15.7 15.7-18.6C34.5 294.9 48 277 48 256s-13.5-38.9-32.3-45.4C7.4 207.7 0 200.8 0 192V128z" class="link-img-path"/></svg> Trailer</RouterLink></li>
                    <li><RouterLink to="/" class="admin-nav-link"><svg height="19" viewBox="0 0 576 512" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z" class="link-img-path"/></svg> Movies</RouterLink></li>
                    <li><RouterLink to="/" class="admin-nav-link"><svg height="19" viewBox="0 0 448 512" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" class="link-img-path"/></svg> Event</RouterLink></li>
                </ul>
            </div>
            <div class="sign-out-container">
                <hr>
                <li><RouterLink to="/" class="admin-nav-link"><svg height="19" viewBox="0 0 576 512" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64v64c0 8.8-7.4 15.7-15.7 18.6C541.5 217.1 528 235 528 256s13.5 38.9 32.3 45.4c8.3 2.9 15.7 9.8 15.7 18.6v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320c0-8.8 7.4-15.7 15.7-18.6C34.5 294.9 48 277 48 256s-13.5-38.9-32.3-45.4C7.4 207.7 0 200.8 0 192V128z" class="link-img-path"/></svg> Sign out</RouterLink></li>
            </div>
        </div>
    </transition>
</template>

<style scoped lang="scss">
    .slide-enter-active, .slide-leave-active {
        transition: transform 0.3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translateX(100%);
    }

    .nav-content {
        transition: all 0.3s ease-in-out;
        left: -100vw;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 20px;
        padding: 30px;
        position: fixed;
        top: 0;
        visibility: visible;
        z-index: 1;

        .nav-admin-links {
            height: 100%;
            display: flex;
            align-items: center;
        }

        ul {
            padding: 0;
        }

        li {
            list-style: none;
            margin: auto;
            margin: 50px 0;
        }

        .admin-nav-link {
            display: flex;
            flex-direction: row;
            text-decoration: none;
            align-items: center;
            font-family: Verdana;
            font-size: 1.2rem;
            color: #eee;
        }
        .link-img {
            margin-right: 10px;
        }
        .link-img-path {
            fill: #ffffff;
        }

        .sign-out-container {
            width: 100%;
            gap: 20px;
        }

        hr {
            color: #ff7b0f;
            width: 100%;
            margin-bottom: 20px;
        }
    }

    .expended-nav {
        transition: all 0.3s ease-in-out;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        gap: 20px;
        padding: 30px;
        position: fixed;
        top: 0;
        visibility: visible;
        z-index: 1;
    }

    .hide {
        display: none;
    }

    .hamburger-btn {
        transition: all 0.3s ease-in-out;
        margin-right: 20px;
        background: transparent;
        border: none;
        position: fixed;   
        z-index: 1;
        top: 0;
        bottom: 0;
        right: 0;
        margin-top: 10px;
    }

    .menu-open-right {
        transition: all 0.3s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 2;
        padding: 0;
        transform: rotate(40deg);
    }
    .menu-open-left {
        transition: all 0.3s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 2;
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
