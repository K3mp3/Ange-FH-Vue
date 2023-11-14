<script setup lang="ts">
    import { saveTrailer } from '@/services/trailerService';
import axios from 'axios';
import { ref } from 'vue';

    const trailerPoster = ref();
    const trailerLink = ref("");
    const trailerTitle = ref("");
    const genre = ref("")
    const age = ref("")
    const date = ref("")
    const time = ref()
    const isSubmitDisabled = ref(true);

    function posterInput(e: Event) {
        const inputElement = e.target as HTMLInputElement
        const image = inputElement.files?.[0]

        if (image) {
            trailerPoster.value = image;
        }
    }

    function checkInputs() {
        if (trailerPoster.value && trailerLink.value && trailerTitle.value && genre.value && age.value && date.value && time.value) {
            console.log("hej")
            isSubmitDisabled.value = false;
        }
        else {
            isSubmitDisabled.value = true;
        }
    }

    async function submitForm() {
        const trailerData = new FormData();
        trailerData.append("poster", trailerPoster.value);
        trailerData.append("link", trailerLink.value);
        trailerData.append("title", trailerTitle.value);
        trailerData.append("genre", genre.value);
        trailerData.append("age", age.value);
        trailerData.append("date", date.value);
        trailerData.append("time", time.value);

        const response = await saveTrailer(trailerData)

        console.log(response);
    }

</script>

<template>
    <div class="upload-form">
        <div class="top-div">
            <h3>Trailer form</h3>
            <RouterLink class="router-link" to="/admin"><FontAwesome :icon="['fas', 'x']" class="close-icon"/></RouterLink>
        </div>
        <form @submit.prevent="submitForm">
            <div class="input-container">
                <label for="movie-poster-input">Trailer Image</label>
                <input type="file" @change="posterInput" @input="checkInputs" name="movie-poster-input" class="movie-upload file-upload" >
            </div>

            <div class="input-container">
                <label for="trailerlink">Link to movie trailer </label>
                <input type="text" v-model="trailerLink" @change="checkInputs" id="trailerlink" name="trailerlink" placeholder="Paste the embeded link here" ref="textInput" class="text-input">
            </div>            
            
            <div class="input-container">
                <label for="movietitle">Movie title </label>
                <input type="text" v-model="trailerTitle" @change="checkInputs" id="movietitle" name="movietitle" placeholder="Avengers Endgame" ref="textInput" class="text-input">
            </div>          

            <div class="input-container">
                <label for="genre">Genre </label>
                <input type="text" v-model="genre" @change="checkInputs" id="genre" name="genre" placeholder="Action" ref="textInput" class="text-input">
            </div>           

            <div class="input-container">
                <label for="age">Minimum age </label>
                <input type="number" v-model="age" @change="checkInputs" id="age" name="age" placeholder="13" ref="textInput" class="text-input">
            </div>

            <div class="input-container">
                <label for="date">Premiere date </label>
                <input type="date" v-model="date" @change="checkInputs" id="date" name="date" ref="textInput" class="text-input">
            </div>

            <div class="input-container">
                <label for="time">Premiere time </label>
                <input type="time" v-model="time" @change="checkInputs" id="time" name="time" ref="textInput" class="text-input last-input">
            </div>

            <button type="submit" :disabled="isSubmitDisabled" @click="checkInputs">                
                <FontAwesome  :class="{ 'fontawesome-icon': !isSubmitDisabled, 'disabled': isSubmitDisabled }" :icon="['fas', 'upload']" />
                Upload poster
            </button>
        </form>
    </div>
</template>

<style setup lang="scss">
/* Text */
h3, h5, p {
    color: #F1F1F1;
    font-size: 1rem;
}

h3 {
    font-size: 1.3rem;
    color: #FF7B0F;
    font-weight: 600;
}

h5 {
    font-family: Verdana;
    margin-bottom: 5px;
}

.router-link {
    width: auto;
    background: transparent;
    border: none;
    border-radius: 8px;

    .close-icon {
        color: #FF7B0F;
        height: 19px;
    }
}

label {
    color: #F1F1F1;
    font-family: Verdana;
}

input {
    color: #F1F1F1;
    font-family: Verdana;
    width: 100vw;
}

.error-input {
    border: 1px solid red; // Replace 'red' with your desired border color
  }

.fontawesome-icon {
    color: #F1F1F1;
}

.upload-form {
    position: fixed;
    z-index: 1;
    width: 100vw;
    max-height: 100vh;
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
            

            
        }

        /* button:active {
            border: 1.5px solid #FF7B0F;

            .close-icon-active {
                color: #FF7B0F;
            }
        }  */
    } 

    form {
        padding: 10px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 25px;
        overflow-y: auto;
        margin-bottom: 50px;

        .input-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
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
            font-family: Verdana;
        }

        .text-input {
            transition: all 0.2s ease-in-out;
            background-color: #242424;
            width: 100%;
            height: 40px;
            padding: 10px;
            border: none;
            border-radius: 10px;
            outline: none; /* Remove the default focus outline */
        }

        .text-input:active,
        .text-input:focus {
            transition: all 0.2s ease-in-out;
            background: transparent;
            border: 1px solid rgb(255, 123, 15);
        }

        button {
            border-radius: 15px;
            border: none;
            display: flex;
            gap: 5px;
            padding: 10px;
            align-items: center;
            justify-content: center;
            background-color: #ff7b0f;
            font-family: Verdana;
            color: #F1F1F1;

            &:disabled {
                background-color: #ff7b0faf;
                color: #c4c4c4;
            }
        }
    }
}
</style>