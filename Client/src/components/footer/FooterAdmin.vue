<script setup lang="ts">
    import { useSignInPopUp } from '@/stores/signInPopUp';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function showSignInForm() {
        const signInPopUpStore = useSignInPopUp();

        window.scrollTo({
            top: 0,
        });

        signInPopUpStore.showSignInForm(true);

        router.push({ name: 'sign in' });
    }
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Admin</h2>
            <button type="button" class="footer-link" @click="showSignInForm">Sign in</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .content-container {
        width: 55%;
    }

    h2 {
        color: #fff;
        font-weight: 600;
        margin-top: 20px;
        font-size: 1.5rem;
    }

    .footer-link {
        color: #fff;
        font-size: 0.9rem;
        background: transparent;
        border: none;
        text-decoration: underline;
        text-align: left;
        font-size: 0.9rem;
        font-family: arial;
    }
}

@media screen and (min-width: 310px) {
    .info-container {
        iframe {
            max-width: 250px;
            height: 183px;
        }
    }
}

@media screen and (min-width: 860px) {
    .info-container {
        display: flex;
        align-items: center;

        h2 {
            margin-top: 10px;
        }
    }
}

@media screen and (min-width: 1200px) {
    .info-container {
        display: flex;
        justify-content: end;
        align-items: center;
        
        .content-container {
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        h2 {
            margin-top: 25px;
        }
    }
}
</style>