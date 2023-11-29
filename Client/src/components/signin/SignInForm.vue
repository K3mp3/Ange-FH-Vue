<!-- eslint-disable arrow-body-style -->
<script setup lang="ts">
    import { useSignInStore } from "@/stores/signIn";
    import { computed, ref } from "vue";
    import gsap from "gsap"; 
    import { signInUser } from "@/services/userService";
    import { useUserEmail } from "@/stores/email";

    const signedIn = computed(() => useSignInStore().signedIn)
    const email = ref("");
    const password = ref("");
    const isSignedIn = ref(false);
    const wrongSignIn = ref(false);

    const newUser = computed(() => {
        return {
            email: email.value,
            password: password.value,
        };
    });

    async function handleSignIn() {
        try {
            const response = await signInUser(newUser.value);
            
            if (!response) {
                wrongSignIn.value = true;
                const input: HTMLInputElement | null = document.querySelector(".textinput");
                console.log(input)
            } else {
                wrongSignIn.value = false;
            }

            console.log(signedIn.value);
            if (signedIn.value) {
                isSignedIn.value = true;
                const userEmailStore = useUserEmail();
                userEmailStore.saveEmail(email.value);

                
            }
        } catch (error) {
            console.log("Error handling users:", error); 
        }
    }
</script>

<template>
    <div class="form-parent-container">
        <div class="wrong-sign-in-container" v-if="wrongSignIn">
            <p>Wrong email or password, please try again!</p>
        </div>
        <div class="form-container">
            <h3>Logga in</h3>
            <form @submit.prevent="handleSignIn">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Exempel@mail.se" ref="textInput" :class="wrongSignIn ? 'wrong-sign-in' : 'text-input'" v-model="email">
                
                <label for="password">Lösenord:</label>
                <input type="password"  name="password" placeholder="Lösenord" ref="textInput" :class="wrongSignIn ? 'wrong-sign-in' : 'text-input'" v-model="password">
                <button type="submit" class="sign-in-btn">Skicka kod</button>
            </form> 
        </div>
    </div>
</template>

<style scoped lang="scss">

    .form-parent-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        padding: 20px;

        .wrong-sign-in-container {
            width: calc(100% - 40px);
            height: 100px;
            background-color: #e60f0f;
            position: absolute;
            margin-top: 100px;
            padding: 10px;
            display: flex;
            align-items: center;
            color: #eee;
            border-radius: 10px;
        }

        .form-container {
            max-width: 260px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 50px;
            width: 100%;

            h3 {
                color: #F1F1F1;
                font-family: Arial;
                font-size: 1.5rem;
                font-weight: 600;
                background: -webkit-linear-gradient(0deg, rgba(255, 123, 15,1) 0%, rgba(128,0,255,1) 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            form {
                color: #F1F1F1;
                font-family: Verdana;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .wrong-sign-in {
                background: transparent;
                width: 100%;
                padding: 12px 10px;
                display: inline-block;
                border: none;
                border-bottom: 1px solid #e60f0f;
                box-sizing: border-box;
                color: #F1F1F1;
                margin-bottom: 30px;
            }

            .text-input {
                background: transparent;
                width: 100%;
                padding: 12px 10px;
                display: inline-block;
                border: none;
                border-bottom: 1px solid #292929;
                box-sizing: border-box;
                color: #F1F1F1;
                margin-bottom: 30px;
            }

            input:focus, textarea:focus, select:focus {
                outline: none;
                transition: all 0.2s ease-in-out;
                border-bottom: 1px solid #ff7b0f;
            }

            .sign-in-btn {
                padding: 12px 0;
                border: none;
                background-color: #F1F1F1;
                font-family: Verdana;
                border-radius: 20px;
                width: 100%;
                color: #292929;
                transition: all 0.5s;
                -webkit-transition: all 0.5s;

                /* &:hover {
                    transition: all 0.2s ease-in-out;
                    background: #ff7b0f;
                    cursor: pointer;
                    color: #F1F1F1;
                } */

                &:active {
                    background-color: #bbbaba;
                    transition: all 0.25s;
                    -webkit-transition: all 0.25s;
                    box-shadow: none;
                    transform: scale(0.97);
                }
            }
        }
    }

    @media (min-width: 505px) {
        .form-parent-container {
            height: auto;
        }
    }
</style>