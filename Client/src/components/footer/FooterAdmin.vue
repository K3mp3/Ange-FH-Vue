<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="text-container">
            <h2>Admin</h2>
            <router-link to="sign-in" class="footer-link">Logga in</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.info-container {
    width: 100%;

    .text-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    h2 {
        color: #fff;
        font-weight: 600;
        margin-top: 30px;
    }

    .footer-link {
        color: #fff;
    }

    span {
        display: flex;
        gap: 10px;
    }

    a {
        color: #fff;
    }

    p {
        color: #fff;
        line-height: 1.75rem;
        margin-bottom: 100px;
    }
}

</style>