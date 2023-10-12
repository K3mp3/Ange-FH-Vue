<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Om oss</h2>
            <router-link to="about-us" class="footer-link">Om oss</router-link>
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
        margin-top: 10px;
        font-size: 1.5rem;
    }

    .footer-link {
        color: #fff;
        font-size: 0.9rem;
    }
}

@media screen and (min-width: 860px) {
    .info-container {
        display: flex;
        align-items: center;

        h2 {
            margin-top: 13px;
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
            margin-top: 0px;
        }
    }
}
</style>