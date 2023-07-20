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
  }
}

const emits = defineEmits<{
  (
    e: "movieInfo",
    poster: File,
    movieImage: File,
    title: string,
    link: string
  ): void;
}>();

function emitImage() {
  if (!moviePoster.value || !movieImage.value) {
    return;
  }

  // Emit the "movieInfo" event with the poster and title
  emits(
    "movieInfo",
    moviePoster.value,
    movieImage.value,
    movieTitle.value,
    movieLink.value
  );
}
</script>
<template>
  <div class="large-container">
    <div class="medium-container">
      <div class="small-container">
      <form @submit.prevent="emitImage" enctype="multipart/form-data">
        <label for="movie-poster-input">Ladda up film poster</label>
        <input type="file" @change="posterInput" name="movie-poster-input" />

        <label for="movie-image-input">Ladda up film bakgrund</label>
        <input type="file" @change="imageInput" name="movie-image-input" />

        <label for="movie-title-input">Film titel</label>
        <input type="text" v-model="movieTitle" name="movie-title-input" />

        <label for="movie-link-input">Länk till film trailer</label>
        <input type="text" v-model="movieLink" name="movie-link-input" />

        <button>Upload image</button>
      </form>
      </div>

      <div class="small-container">
        <form @submit.prevent="emitEventImage" enctype="multipart/form-data">
          <label for="event-poster-input">Ladda up event poster</label>
          <input type="file" @change="posterInput" name="event-poster-input" />

          <label for="event-image-input">Ladda up event bakgrund</label>
          <input type="file" @change="imageInput" name="event-image-input" />

          <label for="event-title-input">Event titel</label>
          <input type="text" v-model="movieTitle" name="event-title-input" />

          <label for="event-link-input">Länk till event trailer</label>
          <input type="text" v-model="movieLink" name="event-link-input" />

          <button>Upload image</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.large-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.medium-container {
  gap: 100px;
  display: flex;
  background-color: #292929;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
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
  color: #fff;
}

label {
  margin-bottom: 2px;
}

input {
  margin-bottom: 20px;
}
</style>
