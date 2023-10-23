<script setup lang="ts">
    import { ref } from 'vue';

    const isNavOpen = ref(false);

    function openNav() {
        isNavOpen.value = !isNavOpen.value;
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
    <nav :class="[isNavOpen ? 'expended-nav' : 'nav']">
    </nav>
</template>

<style scoped lang="scss">
    nav {
        transition: all 0.2s ease-in-out;
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        position: fixed;
        top: 0;
    }

    .expended-nav {
        transition: all 0.2s ease-in-out;
        width: 100vw;
        height: 100vh;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: end;
        padding: 20px;
        position: fixed;
        top: 0;
    }

    .hamburger-btn {
        transition: all 0.2s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;   
    }

    .menu-open-right {
        transition: all 0.2s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 1;
        padding: 0;
        transform: rotate(40deg);
    }
    .menu-open-left {
        transition: all 0.2s ease-in-out;
        margin-left: 20px;
        background: transparent;
        border: none;
        position: fixed;
        z-index: 1;
        padding: 0;
        transform: rotate(-40deg);
    }

    span {
        transition: all 0.2s ease-in-out;
        width: 7px;
        height: 7px;
        margin: 7px;
        border-radius: 7px;
        display: block;
        background-color: #eee;
    }

    .span-open {
        transition: all 0.2s ease-in-out;
        width: 7px;
        height: 7px;
        margin: 7px;
        border-radius: 7px;
        display: block;
    }
</style>