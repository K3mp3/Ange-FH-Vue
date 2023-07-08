<script setup lang="ts">
import { ref } from "vue";

const moviePoster = ref();
const movieImage = ref();
const movieTitle = ref("");
const movieLink = ref("");

function posterInput(e: Event) {
  const inputElement = e.target as HTMLInputElement;

  const image = inputElement.files?.[0];
  // console.log(image);

  if (image) {
    moviePoster.value = image;
    // console.log("moviePoster", moviePoster.value);
  }
}

function imageInput(e: Event) {
  const inputElement = e.target as HTMLInputElement;

  const image = inputElement.files?.[0];
  // console.log(image);

  if (image) {
    movieImage.value = image;
    // console.log("movieImage", movieImage.value);
  }
}

const emits = defineEmits<{
  (e: "movieInfo", poster: File, movieImage: File, title: string, link: string): void;
}>();

function emitImage() {
  if (!moviePoster.value) {
    return;
  }

  // Emit the "movieInfo" event with the poster and title
  emits("movieInfo", moviePoster.value, movieImage.value, movieTitle.value, movieLink.value);
}
</script>

<template>
  <div class="large-container">
    <div class="small-container">
      <form @submit.prevent="emitImage" enctype="multipart/form-data">
        <label for="movie-poster-input">Ladda up film poster</label>
        <input type="file" @change="posterInput" name="movie-poster-input"/>

        <label for="movie-image-input">Ladda up film bakgrund</label>
        <input type="file" @change="imageInput" name="movie-image-input"/>

        <label for="movie-title-input">Film titel</label>
        <input type="text" v-model="movieTitle" name="movie-title-input" />

        <label for="movie-link-input">Länk till film trailer</label>
        <input type="text" v-model="movieLink" name="movie-link-input" />

        <button>Upload image</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.large-container {
  background-color: aliceblue;
  padding: 20px;
}

.small-container {
  padding: 20px;
  max-width: 290px;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

label {
  margin-bottom: 2px;
}

input {
  margin-bottom: 20px;
}
</style>
