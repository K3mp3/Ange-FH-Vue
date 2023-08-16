<script setup lang="ts">
import { ref } from "vue";

const eventPoster = ref();
const eventImage = ref();
const eventTitle = ref("");
const eventLink = ref("");

function posterInput(e: Event) {
  const inputElement = e.target as HTMLInputElement;
  const image = inputElement.files?.[0];

  if (image) {
    eventPoster.value = image;
  }
}

const emits = defineEmits<{
  (
    e: "eventInfo",
    poster: File,
    eventImage: File,
    title: string,
    link: string
  ): void;
}>();

function emitImage() {
  // Emit the "movieInfo" event with the poster and title
  emits(
    "eventInfo",
    eventPoster.value,
    eventImage.value,
    eventTitle.value,
    eventLink.value
  );
}
</script>

<template>

        <form @submit.prevent="emitImage" enctype="multipart/form-data">
          <label for="event-poster-input">Ladda up event poster</label>
          <div class="file-upload-container-event">
            <input type="file" @change="posterInput" name="event-poster-input" class="event-upload file-upload" />
          </div>

          <label for="event-title-input">Event titel</label>
          <input type="text" v-model="eventTitle" name="event-title-input" class="input-text-event text-input" />

          <label for="event-link-input">Länk till event trailer</label>
          <input type="text" v-model="eventLink" name="event-link-input" class="input-text-event text-input" />

          <button type="submit" class="event-btn">Ladda upp event poster</button>
        </form>

</template>

<style scoped>
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

button:hover {
  cursor: pointer;
}

.movie-btn {
  background-color: #ff7b0f;
}

.event-btn {
  background-color: #488BA6;
}
</style>