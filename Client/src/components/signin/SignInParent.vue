<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import SignInForm from "./SignInForm.vue";
    import { useSignInStore } from "../../stores/signIn";

    const screenSize = ref();
    const showRegisterForm = ref(false);
    const hideSignIn = ref(true);
    const signedIn = computed(() => useSignInStore().singedIn)

    let width = document.documentElement.clientWidth;
    
    function controlScreenSize() {
        if (width > 1200) {
            screenSize.value = true;
        } else {
            screenSize.value = false;
        }
    }

    function updateScreenSize() {
        width = document.documentElement.clientWidth;
    }

    function init() {
        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("resize", controlScreenSize);

        updateScreenSize();
 
        if (width > 1200) {
            screenSize.value = true;
        } else {
            screenSize.value = false;
        }
    }

    function showCreateAccountForm(clickedRegister: boolean) {
        showRegisterForm.value = clickedRegister;
        hideSignIn.value = false;
        console.log(showRegisterForm.value);
    }

    onMounted(() => {
        init();
        controlScreenSize();
        updateScreenSize();
        console.log(signedIn.value)
    })

</script>

<template>
    <div class="account-form-parent-container" :class="{ changeWidth: screenSize === true, Test: formIsOpen === true }">
        <SignInForm v-if="hideSignIn" @createaccount="showCreateAccountForm"></SignInForm>
    </div>
</template>

<style scoped lang="scss">
    .account-form-parent-container {
        width: 100%;
        max-width: 500px;
        background-color: #1F1F1F;
        /* background: rgb(0,133,255);
        background: linear-gradient(90deg, rgba(0,133,255,1) 0%, rgba(128,0,255,1) 100%); */
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