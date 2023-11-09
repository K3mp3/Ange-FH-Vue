<script setup lang="ts">
    import { ref } from 'vue';

    const isUploadFormActive = ref(false)

    function showUploadForm() {
        isUploadFormActive.value = !isUploadFormActive.value;
    }
</script>

<template>
    <button type="button" @click="showUploadForm"><FontAwesome :icon="['fas', 'upload']" style="color: #171717;" /> Upload trailer image</button>
    <div class="upload-form" v-if="isUploadFormActive">
        <div class="top-div">
            <h3>Trailer form</h3>
            <button type="button" class="remove-btn" @click="showUploadForm">
                <FontAwesome :icon="['fas', 'x']" class="close-icon" :class="{ 'close-icon-active': isUploadFormActive }" v-if="isUploadFormActive"/>
            </button>
        </div>
        <form>
            <h5>Upload a trailer poster</h5>
            <p>Trailer Image</p>
            <input type="file" @change="posterInput" name="movie-poster-input" class="movie-upload file-upload" />
        </form>
    </div>
</template>

<style setup lang="scss">
/* Text */
h3, h5, p {
    color: #eee;
    font-size: 1rem;
}

h3 {
    font-size: 1.2rem;
    color: #eee;
    font-weight: 600;
}

h5 {
    font-family: Verdana;
    margin-bottom: 5px;
}


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
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(23, 23, 23);
    top: 0;
    left: 0;
    padding: 10px;

    .top-div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;

        button {
            width: auto;
            background: transparent;
            border: 1px solid #6B6B6B;
            padding: 0 11px;
            border-radius: 8px;

            .close-icon {
                color: #F1F1F1;
                height: 19.2px;
            }
        }

        button:active {
            border: 1.5px solid #FF7B0F;

            .close-icon-active {
                color: #FF7B0F;
            }
        } 
    } 

    form {
        padding: 10px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        input {
            color: #F1F1F1;
        }

        .file-upload{
            max-width: 204px;
            cursor: pointer;
        }

        input.movie-upload::file-selector-button {
            background-color: #F1F1F1;
            border: none;
            width: 99px;
            height: 33px;
            border-radius: 15px;
            color: #171717;
        }
    }
}
</style>