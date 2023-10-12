<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <h2>Admin</h2>
        <router-link to="sign-in" class="footer-link">Logga in</router-link>
    </div>
</template>

<style scoped lang="scss">
.info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
        color: #fff;
        font-weight: 600;
        margin-top: 20px;
        font-size: 1.5rem;
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
}

</style>