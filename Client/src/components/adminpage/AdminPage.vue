<script setup lang="ts">

    import { ref } from 'vue';

    const selectedFile = ref<File | null>(null);
    const imageUrl = ref<string | null>(null);
    const movieTitle = ref("");


    function fileInput(e: Event) {
        const inputElement = e.target as HTMLInputElement;
        selectedFile.value = inputElement.files ? inputElement.files[0] : null

        //console.log(selectedFile.value);
        if (selectedFile.value) {
            imageUrl.value = URL.createObjectURL(selectedFile.value);
        }
    }

    const emits = defineEmits<{ (e: "movieInfo", poster: FormData, movietitle: string): void }>();

    async function emitImage() {
        if (!selectedFile.value) {
            //console.log("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile.value)
        //console.log(formData);
        console.log(movieTitle.value);

        emits ("movieInfo", formData, movieTitle.value)

    }
</script>
<template>
    <div class="large-container">
        <div class="small-container">
            <input type="file" @change="fileInput"/>
            <label for="movie-title-input">Film titel</label>
            <input type="text" v-model="movieTitle" name="movie-title-input"/>
            <button accept="image/jpeg, image/png, image/jpg" @click="emitImage">Upload image</button>
            <!-- <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" /> -->
        </div>
    </div>
</template>
<style scoped>
    .large-container {
        background-color: aliceblue;
        padding: 20px;
    }
    .small-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        max-width: 290px;
        margin: auto;
    }

    input {
        margin-bottom: 10px;
    }
</style>