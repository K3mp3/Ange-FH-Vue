<script setup lang="ts">
    import FooterContact from './FooterContact.vue';
    import FooterHelpUs from './FooterHelpUs.vue';
    import FooterAboutUs from './FooterAboutUs.vue';
    import FooterFindUs from './FooterFindUs.vue';
    import FooterAdmin from './FooterAdmin.vue';
</script>

<template>
    <div class="footer-parent-container">
        <hr> 
        <div class="footer-container">
            <div class="left-container component-container">
                <FooterContact></FooterContact>
                <FooterHelpUs></FooterHelpUs>
            </div>

            <div class="center-container component-container">
                <FooterAboutUs></FooterAboutUs>
                <FooterAdmin></FooterAdmin>
            </div>

            <div class="right-container component-container">
                <FooterFindUs></FooterFindUs>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    hr {
        color: #ff7b0f;
    }
    .footer-parent-container {
        margin-top: 20px;
        padding: 20px 30px;

        .component-container {
            display: flex;
            flex-direction: column;
        }

        .left-container {
            order: 1;
        }

        .right-container {
            order: 3;
        }

        .center-container {
            order: 2;
        }
    }

    @media (min-width: 860px) {
        .footer-container {
            display: grid;
            grid-template-areas:
            "left-container center-container"
            "right-container right-container";
            max-width: 1450px;
            gap: 40px;
            margin: auto;
            margin-bottom: 50px;


            .left-container {
                order: 1;
                width: 100%;
            }

            .center-container {
                order: 3;
                width: 100%;
                margin: 0;
                margin-top: -245px;
            }

            .right-container {
                order: 2;
                width: 100%;
            }
        }
    }

    @media (min-width: 1200px) {
        hr {
            margin-bottom: 20px;
        }
        .footer-container {
            display: flex;
            grid-template-areas:
            "left-container right-container center-container";
            max-width: 1500px;
            gap: 40px;
            margin: auto;


            .left-container {
                order: 1;
                width: 100%;
            }

            .center-container {
                order: 3;
                width: 100%;
                margin-top: 0px;
            }

            .right-container {
                order: 2;
                width: 100%;
            }
        }
    }
</style>