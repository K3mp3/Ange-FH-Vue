<!-- eslint-disable arrow-body-style -->
<script setup lang="ts">
    import { checkToken } from '@/services/userService';
    import { useUserEmail } from '@/stores/email';
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const userEmail = computed(() => useUserEmail().userEmail);
    const token = ref();
    const router = useRouter();

    const user = computed(() => {
        return {
            email: userEmail.value,
            token: token.value,
        }
    })

    async function handleSignIn() {
        const response = await checkToken(user.value);
        
        if (response === true) {
            router.push({ name: 'admin page' });
        } else {
            console.log("false:", response); 
        }
    }
</script>

<template>
    <form @submit.prevent="handleSignIn" class="token-container">
        <label for="token-input">Kod</label>
        <input type="text" class="text-input" name="token-input" v-model="token">
        <button type="submit">Logga in</button>
    </form>
</template>

<style setup lang="scss">
    .token-container {
        background-color: #1F1F1F;
        margin: auto;
        padding: 40px;
        border-radius: 10px;
        width: 300px;

        label {
            color: #F1F1F1;
            font-family: Verdana;
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

        button {
            padding: 10px 0;
            border: none;
            background-color: #F1F1F1;
            /* color: #F1F1F1; */
            font-family: Verdana;
            border-radius: 20px;
            width: 100%;

            &:hover {
                transition: all 0.2s ease-in-out;
                background: #ff7b0f;
                cursor: pointer;
                color: #F1F1F1;
            }
        }
    }
</style>