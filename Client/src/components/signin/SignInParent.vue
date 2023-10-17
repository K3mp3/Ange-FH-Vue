<script setup lang="ts">
    import { computed, ref, onMounted } from "vue";
    import SignInForm from "./SignInForm.vue";
    import { useSignInStore } from "../../stores/signIn";
    import SignInToken from "./SignInToken.vue";

    const signedIn = computed(() => useSignInStore().signedIn)

    const screenSize = ref();
    const hideSignIn = ref(true);

    onMounted(() => {
        window.scrollTo({
            top: 88,
        });
    })
</script>

<template>
    <div class="account-form-parent-container" :class="{ changeWidth: screenSize === true }">
        <SignInForm v-if="hideSignIn"></SignInForm>
    </div>
    <div class="background-container" v-if="signedIn">
        <SignInToken></SignInToken>>
    </div>
</template>

<style scoped lang="scss">
    .account-form-parent-container {
        width: 100%;
        width: 550px;
        background-color: #1F1F1F;
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