<script setup lang="ts">
    import AdminPageVue from '@/components/adminpage/AdminPage.vue';
    import axios from 'axios';
    import { ref } from 'vue';

    interface MovieResponse {
        poster: string;
        title: string;
    }


    const savedMovie = ref<any>(null);
    const imageUrl = ref<string | null>(null); // Add a new ref for the image URL

    async function saveMovieInfo(moviePoster: File, movieTitle: string) {
        console.log("poster", moviePoster, "title", movieTitle);

        const formData = new FormData();
        formData.append('poster', moviePoster);
        formData.append('title', movieTitle);

        try {
            const response = await axios.post("http://localhost:3000/movie/savemovie", formData)
            console.log("Movie saved successfully!", response.data);

            const { poster, title } = response.data;

            console.log("response", response.data);

            savedMovie.value = {
            poster: poster,
            title: title,
            };
            
            // imageUrl.value = await getImageUrl(savedMovie.value.poster); // Set the image URL

            console.log("savedMovie.value", savedMovie.value);
        } catch (error) {
            console.log("Failed to save movie:", error);
        }
    }

    // async function getImageUrl(poster: string): Promise<string> {
    //     // Update the URL to the server endpoint where the images are served
    //     const serverUrl = 'http://localhost:3000';

    //     try {
    //         const response = await axios.get(`${serverUrl}/images/${poster}`, {
    //         responseType: 'blob',
    //         });

    //         // Create a blob URL from the response data
    //         const imageUrl = URL.createObjectURL(response.data);
    //         return imageUrl;
    //     } catch (error) {
    //         console.log("Failed to fetch image:", error);
    //         return '';
    //     }
    // }
</script>

<template>
    <div>
      <AdminPageVue @movieInfo="saveMovieInfo"></AdminPageVue>
      <!-- <img :src="getImageUrl(savedMovie?.poster)" alt="Uploaded Image" v-if="savedMovie" /> -->
    </div>
</template>
<style scoped>
  
</style>