<script setup lang="ts">

    import { ref } from 'vue';

    const selectedFile = ref<File | null>(null);
    const imageUrl = ref<string | null>(null);


    function fileInput(e: Event) {
        const inputElement = e.target as HTMLInputElement;
        selectedFile.value = inputElement.files ? inputElement.files[0] : null

        //console.log(selectedFile.value);
        if (selectedFile.value) {
            imageUrl.value = URL.createObjectURL(selectedFile.value);
        }
    }

    const emits = defineEmits<{ (e: "moviePoster", poster: FormData): void }>();

    async function emitImage() {
        if (!selectedFile.value) {
            //console.log("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile.value)
        //console.log(formData);

        emits ("moviePoster", formData)
    }
</script>
<template>
    <div class="small-container">
        <input type="file" @change="fileInput"/>
        <button accept="image/jpeg, image/png, image/jpg" @click="emitImage">Upload image</button>
        <!-- <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" /> -->
    </div>
</template>
<style scoped>
    .small-container {
        background-color: aliceblue;
        padding: 20px;
    }
</style>