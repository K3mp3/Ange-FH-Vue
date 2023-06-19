<script setup lang="ts">
    import AdminPageVue from '@/components/adminpage/AdminPage.vue';
    import axios from 'axios';
    import { ref } from 'vue';

    interface Poster {
        filename: string;
        url: string;
    }


    const savedMovie = ref<any>(null);
    const imageUrl = ref<Poster[]>([]);

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
            
            console.log("savedMovie.value", savedMovie.value);
        } catch (error) {
            console.log("Failed to save movie:", error);
        }
    }

    async function getPosters() {
  try {
    const response = await axios.get('http://localhost:3000/movie/posters');
    const posters = response.data;

    imageUrl.value = posters.map((poster: Poster) => ({
      filename: poster.filename,
      url: `http://localhost:3000/images/${poster.filename}`,
    }));
  } catch (error) {
    console.error('Failed to retrieve posters:', error);
  }
}
</script>

<template>
    <div>
      <AdminPageVue @movieInfo="saveMovieInfo"></AdminPageVue>
      <button @click="getPosters">Get posters</button>
        <div v-for="poster in imageUrl" :key="poster.filename">
            <img :src="poster.url" :alt="poster.filename" />
        </div>
    </div>
</template>
<style scoped>
  /* scroll-snap-type: y
  scroll-behavior: smooth */
</style>