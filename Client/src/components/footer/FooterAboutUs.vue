<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="text-container">
            <h2>Om oss</h2>
            <router-link to="about-us" class="footer-link">Om oss</router-link>
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

@media (min-width: 860px) {
    .info-container {
        h2 {
            margin-top: 30px;
        }
    }
}

</style>