<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { gsap } from 'gsap';
    import StartPageAsideLinks from './StartPageAsideLinks.vue';
    import NavHeaderLogo from './NavHeaderLogo.vue';

    const isHeaderHidden = ref(false);

    let prevScrollpos = window.scrollY;

    onMounted(async () => {
        const mobileHeader = document.querySelector("header");
        console.log("mobileHeader", mobileHeader)
        function headerAnimation() {
            const currentScrollPos = window.scrollY;

            if (prevScrollpos < currentScrollPos) {
                mobileHeader?.classList.remove("header-animation")
                console.log("ja", mobileHeader)
                gsap.to(mobileHeader, { y: "-100px",});
            } else {
                mobileHeader?.classList.add("header-animation")
                gsap.from(mobileHeader, { y: "0",});
            }
            
            prevScrollpos = currentScrollPos;
        }
  
      document.addEventListener("scroll", headerAnimation);
    });
</script>
<template>
    <header :class="{ hidden: isHeaderHidden }">
        <NavHeaderLogo></NavHeaderLogo>
    </header>
    <nav>
        <StartPageAsideLinks></StartPageAsideLinks>
    </nav>
</template>
<style scoped>
    header {
      width: 100%;
      margin: auto;
      padding: 20px;
      position: fixed;
      top: 0;
      background-color: rgb(28, 28, 28, 0.9);
      z-index: 1;
    }

    .header-animation {
        transition: all 0.5s ease-in-out;
    }

    nav {
        position: fixed;
        bottom: 20px;
        left: 0;
        width: 100%;
        height: 70px; /* Adjust the height of the bottom navigation bar */
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>