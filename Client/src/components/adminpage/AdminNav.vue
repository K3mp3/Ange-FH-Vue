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
    <div class="nav-top">
        <img src="../../../public/img/AngeFh-logo.png" alt="square icon with blue and yellow 'propellers' and the organisation name to the left"/>
    </div>
</template>

<style scoped lang="scss">
    .nav-top {
        padding: 20px;
        background-color: #090f207f;
        border-bottom: 1px solid #3030307f;
        display: flex;
        justify-content: start;

        img {
            max-width: 110px;
        }
    }

    /* .slide-enter-active, .slide-leave-active {
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
    } */
</style>
