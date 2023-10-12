<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Hjälp till</h2>
            <router-link to="help-us" class="footer-link">Bli volontär</router-link>
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

@media screen and (min-width: 860px) {
    .info-container {
        display: flex;
        align-items: center;

        .content-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        h2 {
            margin-top: 20px;
        }
    }
}

@media screen and (min-width: 1200px) {
    .info-container {
        display: flex;
        align-items: start;
        
        .content-container {
            display: flex;
            gap: 10px;
            margin-left: 75px;
        }

        h2 {
            margin-top: 20px;
        }
    }
}
</style>