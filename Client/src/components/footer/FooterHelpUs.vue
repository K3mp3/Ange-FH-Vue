<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <h2>Hjälp till</h2>
        <router-link to="help-us" class="footer-link">Bli volontär</router-link>
        <div class="box">
        </div>
    </div>
</template>

<style scoped lang="scss">
.info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .box {
        width: 30px;
        height: 30px;
        background-color: brown;
        margin-top: -10px;
    }

    h2 {
        color: #fff;
        font-weight: 600;
        margin-top: 15px;
        font-size: 1.5rem;
    }

    .footer-link {
        color: #fff;
        font-size: 0.9rem;
    }
}
</style>