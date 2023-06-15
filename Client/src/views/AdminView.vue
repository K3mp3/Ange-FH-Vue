<script setup lang="ts">
    import AdminPageVue from '@/components/adminpage/AdminPage.vue';

    function saveMoviePoster(moviePoster: FormData) {
        console.log("moviePoster", moviePoster);
    }
</script>

<template>
 <AdminPageVue @moviePoster="saveMoviePoster"></AdminPageVue>
</template>

<style scoped>
  
</style>