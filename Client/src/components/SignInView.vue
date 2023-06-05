<script setup lang="ts">
    import SignInFormVue from './SignInForm.vue';

    function sendUserData(username: string, email: string, password: string) {
        console.log("username", username);
        console.log("email", email);
        console.log("password", password);

        const loginUser = {
            username: username,
            email: email,
            password: password
        }

        console.log("loginUser", loginUser);

        fetch("http://localhost:3000/users/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        })
        .then(res => res.json())
        .then(data => {
            if (data.username) {
                console.log("data", data);
            } else {
                alert("We couldn't find a");
            }
        })
    }
</script>
<template>
    <SignInFormVue @signIn="sendUserData"></SignInFormVue>
</template>
<style scoped>

</style>