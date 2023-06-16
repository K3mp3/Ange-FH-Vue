<script setup lang="ts">
    import AdminPageVue from '@/components/adminpage/AdminPage.vue';

    function saveMovieInfo(moviePoster: FormData, movieTitle: string) {
        console.log("moviePoster", moviePoster, movieTitle);

        const movieInfo = {
            poster: moviePoster,
            title: movieTitle,
        };

        console.log("movieInfo", movieInfo);

        fetch("http://localhost:3000/users/savemovieposter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movieInfo)
        })
        .then(res => res.json())
        .then(movieInfo => {
            console.log("data", movieInfo);
            alert(movieInfo);
        })
    }
</script>

<template>
 <AdminPageVue @movieInfo="saveMovieInfo"></AdminPageVue>
</template>

<style scoped>
  
</style>