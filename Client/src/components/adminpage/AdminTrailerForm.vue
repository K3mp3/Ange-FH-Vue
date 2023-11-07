<script setup lang="ts">
    import { ref } from 'vue';

    const isUploadFormActive = ref(false)

    function showUploadForm() {
        isUploadFormActive.value = true;
    }
</script>

<template>
    <button type="button" @click="showUploadForm"><FontAwesome :icon="['fas', 'upload']" style="color: #171717;" /> Upload trailer image</button>
    <div class="upload-form" v-if="isUploadFormActive">
        <div class="top-div">
            <h3>Trailer form</h3>
            <button type="button">

            </button>
        </div>
        <hr>
    </div>
</template>

<style setup lang="scss">
button {
    background-color: #EEEEEE;
    border: none;
    width: 100%;
    height: 33px;
    border-radius: 15px;
    color: rgb(23, 23, 23);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.upload-form {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: aqua;
    top: 0;
    left: 0;
    padding: 10px 10px;

    .top-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
            width: auto;
        }
    }
}
</style>