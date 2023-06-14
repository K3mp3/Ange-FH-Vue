<script setup lang="ts">
    import CreateAccountFormVue from './CreateAccountForm.vue';

    function createUserAccount(username: string, email: string, password: string) {
        console.log("username", username);
        console.log("email", email);
        console.log("password", password);

        const createUser = {
            username: username,
            email: email,
            password: password
        }

        console.log("createUser", createUser);

        fetch("http://localhost:3000/users/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createUser)
        })
        .then(res => res.json())
        .then(createUser => {
            console.log("data", createUser);
            alert(createUser);
            //alert("Welcome, your account is now created. Please sign in to access all your information by reloading this webpage.");
        })
        .catch(err => console.log("err", err));
        }
</script>
<template>
    <CreateAccountFormVue @createaccount="createUserAccount"></CreateAccountFormVue>
</template>
<style scoped>

</style>