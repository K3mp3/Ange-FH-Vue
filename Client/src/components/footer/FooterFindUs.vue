<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Hitta hit</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.7565882442461!2d15.65756787732601!3d62.524872576316476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46659a9a94437657%3A0xe617696279a261cc!2s%C3%85nge%20Folkets%20Hus!5e0!3m2!1ssv!2sse!4v1691936578064!5m2!1ssv!2sse" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <p>
                Ånge Folkets Hus <br>
                Centralgatan 20 <br>
                841 33 Ånge
            </p>
        </div>
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

    iframe {
        width: 100%;
        height: 167px;
        border-radius: 15px;
        margin-top: 15px;
    }

    p {
        color: #fff;
        line-height: 1.75rem;
        margin-bottom: 100px;
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
        justify-content: end;
        align-items: end;

        h2 {
            margin-top: 10px;
        }
    }
}
</style>