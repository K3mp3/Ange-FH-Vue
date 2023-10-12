<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Admin</h2>
            <router-link to="sign-in" class="footer-link">Logga in</router-link>
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
        align-items: end;
        
        .content-container {
            width: 25%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-right: 75px;
        }

        h2 {
            margin-top: 25px;
        }
    }
}
</style>