<script setup lang="ts">
import AdminPageVue from "@/components/adminpage/AdminPage.vue";
import axios from "axios";
import { ref } from "vue";

interface Movie {
  _id: string;
  title: string;
  poster: string;
}

const savedMovie = ref<any>(null);
const movies = ref<Movie[]>([]);

async function saveMovieInfo(moviePoster: File, movieTitle: string) {
  console.log("poster", moviePoster, "title", movieTitle);

  const formData = new FormData();
  formData.append("poster", moviePoster);
  formData.append("title", movieTitle);

  try {
    const response = await axios.post(
      "http://localhost:3000/movie/savemovie",
      formData
    );
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
    const response = await axios.get("http://localhost:3000/movie");
    movies.value = response.data;
  } catch (error) {
    console.error("Failed to retrieve posters:", error);
  }
}
</script>

<template>
  <div>
    <AdminPageVue @movieInfo="saveMovieInfo"></AdminPageVue>
    <button @click="getPosters">Get posters</button>
    <div v-for="movie in movies" :key="movie._id">
      <img
        :src="`http://localhost:3000/movie/image/${movie.poster}`"
        :alt="movie.title"
      />
    </div>
  </div>
</template>
<style scoped>
/* scroll-snap-type: y
  scroll-behavior: smooth */
</style>
