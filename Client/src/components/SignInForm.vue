<script setup lang="ts">
    import type { IUserSignIn } from '@/models/IUserSignIn';
import router from '@/router';
    import { ref } from 'vue';

    const user = ref<IUserSignIn>({username: "", email: "", password: ""})

    const emits = defineEmits<{ (e: "signIn", username: string, email: string, password: string,): void }>();

    function handleSignInRequest() {
        console.log("user", user.value);

        emits ('signIn', user.value.username, user.value.email, user.value.password);
    }

    function sendUserToCreateAccountRouter() {
        console.log("create account");
        router.push("/createaccount");
    }
</script>

<template>
    <form @submit.prevent="handleSignInRequest">
        <div class="account-container">
            <h1>Sign in</h1>
            <label for="uname" class="visually-hidden">Username </label>
            <input type="text" id="uname" name="uname" v-model="user.username" placeholder="Username" class="left-input">

            <label for="email" class="visually-hidden">Email </label>
            <input type="email" id="email" name="email" v-model="user.email" placeholder="Email" class="left-input">

            <label for="pword" class="visually-hidden">Password </label>
            <input type="password" id="pword" name="pword" v-model="user.password" placeholder="password" class="left-input">
            
            <button>Sing in</button>
        </div>
    </form>

    <form @submit.prevent="sendUserToCreateAccountRouter">
        <div class="profile-picture-container">
            <h1>Hi there!</h1>
            <p>Don't you have an account? No worries, just click on the button and create one.</p>

            <button>Create ccount</button>
        </div>
    </form>
</template>

<style scoped>
    form {
    width: 450px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
}
.visually-hidden {
    position: absolute;
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

.account-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.profile-picture-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    border: 1px solid #bc6ff0;
    color: #eeeeee;
    border-radius: 20px;
    text-align: center;
    padding: 20px;
}

h1 {
    color: #eeeeee;
}

.left-input {
    width: 100%;
    height: 40px;
    margin: auto;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: #363030;   
    color: #eeeeee;
}

.left-input:focus {
    outline: 1px solid #da5a56;
    transition: all 0.5s;
    background-color: #292424;
    /*linear-gradient(to right, #da5a56 0%, #bc6ff0 100%) */ 
}

.right-input:focus {
    outline: 1px solid #bc6ff0;
    transition: all 0.5s;
    background-color: #292424;
    /*linear-gradient(to right, #da5a56 0%, #bc6ff0 100%) */ 
}

button {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 30px;
    background-color: #ebebeb;
    font-size: 1.2rem;
}

button:hover {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 30px;
    background-color: #ebebeb;
    cursor: pointer;
}
</style>