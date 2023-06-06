<script setup lang="ts">
    const links: string[] = ["Create room", "About", "Contact", "FAQ"];

    function handleClick(link: string) {
        const trimmedLink = link.trim().replace(/\s/g, '');
        console.log("link", trimmedLink.toLowerCase());

        // <ul>
        //     <li v-for="link in links"><a @click="handleClick(link)">{{ link }}</a></li>
        // </ul>
    }
</script>
<template>
    <div class="logo-container">
        <img src="../../../public/img/AngeFH_rgb.jpg">
    </div>
    <div class="navigation-container">

    </div>
</template>
<style scoped>
    .logo-container {
        background-color: #5dc3dd;
        width: 100%;
    }

    .navigation-container {
        background-color: #dd5dd2;
        width: 100%;
    }
</style>