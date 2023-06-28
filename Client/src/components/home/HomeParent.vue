<script setup lang="ts">
  import axios from "axios";
  import { onMounted, ref } from "vue";

    interface IMovie {
      _id: string;
      title: string;
      poster: string;
    }

    const movies = ref<IMovie[]>([]);

    onMounted(async () => {
        try {
            const response = await axios.get("http://localhost:3000/movie");
            movies.value = response.data;
            console.log(movies.value)
        } catch (error) {
            console.error("Failed to retrieve posters:", error);
        }
    })
</script>

<template>
    <div class="large-container">
      <h1>Kommande filmer</h1>
      <div class="medium-container">
        <div v-for="movie in movies" :key="movie._id" class="movies">
          <img 
            :src="`http://localhost:3000/movie/image/${movie.poster}`"
            :alt="movie.title"
          />
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .large-container {
    padding-top: 40px;
    max-width: 1400px;
    margin: auto;
  }

  h1 {
    margin-left: 20px;
    color: #eeeeee;
    margin-bottom: 40px;
  }

  .medium-container {
    display: flex;
    flex-direction: row;
  }
.movies {
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    max-height: 300px;
    padding: 0 20px;
  }

  h3 {
    margin: 5px 0 0 20px;
    color: #eeeeee;
  }
</style>
