<script setup lang="ts">
    import { computed, ref, onMounted } from "vue";
    import axios from "axios";
    import SignInForm from "./SignInForm.vue";
    import { useSignInStore } from "../../stores/signIn";
    import SignInToken from "./SignInToken.vue";

    const signedIn = computed(() => useSignInStore().signedIn)

    const screenSize = ref();
    const hideSignIn = ref(true);

    interface ITrailer {
        _id: string;
        title: string;
        poster: string;
        link: string;
    }

    const trailers = ref<ITrailer[]>([]);

    onMounted(async() => {
        window.scrollTo({
            top: 88,
        });
        try {
        const response = await axios.get("http://localhost:3000/trailer");
        trailers.value = response.data;
        } catch (error) {
            alert(error);
        }
    })
</script>

<template>
      <div class="sign-in-background"  v-if="trailers.length > 0">
        <img :src="`http://localhost:3000/trailer/image/${trailers[0].poster}`" alt="movie poster">
    </div>
    <div class="account-form-parent-container" :class="{ changeWidth: screenSize === true }">
        <SignInForm v-if="hideSignIn"></SignInForm>
    </div>
    <div class="background-container" v-if="signedIn">
        <SignInToken></SignInToken>>
    </div>
</template>

<style scoped lang="scss">
    .sign-in-background {
        position: absolute;
        width: 100vw;
        left: 0;
        overflow-x: hidden;
        margin: 0;

        img {
            min-width: 100vw;
            height: 100vh;
            margin: auto;
        }

        .dark-background-bottom {
            bottom: 0;
            width: 100vw;
            height: 55px;
            position: absolute;
            background-color: #000000;
        }
    }
    .account-form-parent-container {
        width: 100%;
        width: 550px;
        background-color: rgba(22, 22, 22, 0.6);
        backdrop-filter: blur(4px);
        margin: auto;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        display: flex;
        justify-content: space-between;
        gap: 40px;
    }

    .changeWidth {
        max-width: 900px;
    }

    .background-container {
        width: 100vw;
        height: 100vh;
        position: absolute;
        background-color: rgb(0, 0, 0, 0.8);
        backdrop-filter: blur(3px);
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        position: fixed;
    }

    @media (min-width: 505px) {
        .account-form-parent-container {
            border-radius: 20px;
        }
    }
</style>