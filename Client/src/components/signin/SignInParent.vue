<script setup lang="ts">
    import { ref } from "vue";
    import SignInForm from "./SignInForm.vue";
    import { useSignInStore } from "../../stores/signIn";

    const screenSize = ref();
    const hideSignIn = ref(true);
</script>

<template>
    <div class="account-form-parent-container" :class="{ changeWidth: screenSize === true }">
        <SignInForm v-if="hideSignIn"></SignInForm>
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

    @media (min-width: 505px) {
        .account-form-parent-container {
            border-radius: 20px;
        }
    }
</style>