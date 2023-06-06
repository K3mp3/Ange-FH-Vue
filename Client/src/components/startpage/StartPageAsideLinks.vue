<script setup lang="ts">
    import { RouterLink } from 'vue-router'

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
            <ul>
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

    li {
        list-style: none;
    }

    .router-link {
        text-decoration: none;
    }
</style>