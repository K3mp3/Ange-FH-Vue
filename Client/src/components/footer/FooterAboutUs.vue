<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="box">
        </div>
        <h2>Om oss</h2>
        <router-link to="about-us" class="footer-link">Om oss</router-link>
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
        background-color: rgb(42, 140, 165);
    }

    h2 {
        color: #fff;
        font-weight: 600;
        font-size: 1.5rem;
        margin-top: 20px;
    }

    .footer-link {
        color: #fff;
    }
}

@media (min-width: 860px) {
    .info-container {
        h2 {
            margin-top: -15px;
        }
    }
}

</style>