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
  <div class="movie-parent-container">
    <h1>Välkommen</h1>
    <h4>Ladda upp filmer och event</h4>
    <div class="medium-container">
      <div class="small-container">
      <form @submit.prevent="emitImage" enctype="multipart/form-data">
        <label for="movie-poster-input" class="file-upload-label">Film poster</label>
        <div class="file-upload-container-movie">
          <input type="file" @change="posterInput" name="movie-poster-input" class="movie-upload file-upload" />
        </div>

        <label for="movie-image-input">Ladda up film bakgrund</label>
        <div class="file-upload-container-movie">
          <input type="file" @change="imageInput" name="movie-image-input" class="movie-upload file-upload" />
        </div>

        <label for="movie-title-input">Film titel</label>
        <input type="text" v-model="movieTitle" name="movie-title-input" class="input-text-movie text-input" />

        <label for="movie-link-input">Länk till film trailer</label>
        <input type="text" v-model="movieLink" name="movie-link-input" class="input-text-movie text-input" />

        <button class="movie-btn">Ladda upp film poster</button>
      </form>
      </div>

      <div class="small-container">
        <form @submit.prevent="emitEventImage" enctype="multipart/form-data">
          <label for="event-poster-input">Ladda up event poster</label>
          <div class="file-upload-container-event">
            <input type="file" @change="posterInput" name="event-poster-input" class="event-upload file-upload" />
          </div>

          <label for="event-image-input">Ladda up event bakgrund</label>
          <div class="file-upload-container-event">
            <input type="file" @change="imageInput" name="event-image-input" class="event-upload file-upload" />
          </div>

          <label for="event-title-input">Event titel</label>
          <input type="text" v-model="movieTitle" name="event-title-input" class="input-text-event text-input" />

          <label for="event-link-input">Länk till event trailer</label>
          <input type="text" v-model="movieLink" name="event-link-input" class="input-text-event text-input" />

          <button class="event-btn">Ladda upp event poster</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-parent-container {
  background-color: #292929;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

h1 {
  font-weight: 700;
  margin-bottom: 10px;
}

.medium-container {
  gap: 70px;
  display: flex;
  background-color: #292929;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
  text-align: left;
  margin-top: 30px;
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
  margin-bottom: 4px;
  font-weight: 300;
}

.text-input {
  margin-bottom: 20px;
}

.file-upload-container-movie {
  border: 1px dashed #FF7B0F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
}

.file-upload-container-event {
  border: 1px dashed #488BA6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-bottom: 20px;
}

.file-upload{
  max-width: 204px;
  cursor: pointer;
}

input.movie-upload::file-selector-button {
    background-color: #FF7B0F;
    border: none;
    width: 99px;
    height: 33px;
    border-radius: 15px;
    color: #fff;
}

input.event-upload::file-selector-button {
    background-color: #488BA6;
    border: none;
    width: 99px;
    height: 33px;
    border-radius: 15px;
    color: #fff;
}

.input-text-movie {
  height: 33px;
  background: transparent;
  border: 1px solid #FF7B0F;
}

.input-text-event {
  height: 33px;
  background: transparent;
  border: 1px solid #488BA6;
}

button {
  border: none;
  color: #eeeeee;
  width: 250px;
  font-size: 1rem;
  font-weight: 300;
  height: 50px;
  border-radius: 10px;
}

.movie-btn {
  background-color: #ff7b0f;
}

.event-btn {
  background-color: #488BA6;
}
</style>
