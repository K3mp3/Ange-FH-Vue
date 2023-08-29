<!-- eslint-disable vue/no-export-in-script-setup -->
<script setup lang="ts">
import { ref } from 'vue';


// movies
const moviePoster = ref();
const movieImage = ref();
const movieTitle = ref("");
const movieDescription = ref("");
const movieLink = ref("");

function posterInput(e: Event) {
  const inputElement = e.target as HTMLInputElement;
  const image = inputElement.files?.[0];

  if (image) {
    moviePoster.value = image;
  }
}

const emits = defineEmits<{
  (
    e: "movieInfo",
    poster: File,
    movieImage: File,
    title: string,
    movieDescription: string,
    link: string
  ): void;
}>();

function emitImage() {
  // Emit the "movieInfo" event with the poster and title
  console.log(movieDescription.value)
  emits(
    "movieInfo",
    moviePoster.value,
    movieImage.value,
    movieTitle.value,
    movieDescription.value,
    movieLink.value
  );
}

</script>
<template>
      <form @submit.prevent="emitImage" enctype="multipart/form-data">
        <div class="left-form">
          <label for="movie-poster-input" class="file-upload-label">Film poster</label>
          <div class="file-upload-container-movie">
            <input type="file" @change="posterInput" name="movie-poster-input" class="movie-upload file-upload" />
          </div>

          <label for="movie-title-input">Film titel</label>
          <input type="text" v-model="movieTitle" name="movie-title-input" class="input-text-movie text-input" />

          <label for="movie-link-input">Länk till film trailer</label>
          <input type="text" v-model="movieLink" name="movie-link-input" class="input-text-movie text-input" />

          <button type="submit" class="movie-btn">Ladda upp film poster</button>
        </div>
        <div class="right-form">
          <label for="text-editor">Film beskrivning</label>
          <textarea rows="10" cols="20" name="text-editor" class="textarea" v-model="movieDescription"></textarea>
        </div>
      </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  color: #fff;
  gap: 10px;
}

.left-form {
  display: flex;
  flex-direction: column;
}

.right-form {
  width: 244px;
}

.textarea {
    width: 244px;
    height: 324px;
    color: #fff;
    background: transparent;
    border: 1px solid #FF7B0F;
    margin-top: 4px;
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

.input-text-movie {
  height: 33px;
  background: transparent;
  border: 1px solid #FF7B0F;
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

button:hover {
  cursor: pointer;
}

.movie-btn {
  background-color: #ff7b0f;
}
</style>
