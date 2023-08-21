<script setup lang="ts">
</script>

<template>
    <div class="footer-container">
       <hr> 
       <div class="large-container">
        <div class="medium-container">
        <div class="small-container">
            <h2>Kontakt</h2>
            <router-link to="contact-us" class="footer-link">Kontakta oss</router-link>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="link-img"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" class="link-img-path"/>
                </svg>
                <a href="mailto:info@angefolketshus.se">info@angefolketshus.se</a>
            </span>
            <span>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_116_39)">
                    <path d="M8.6959 1.29717C8.28984 0.316314 7.21934 -0.205757 6.19629 0.0737354L1.55566 1.33936C0.638086 1.59249 0 2.42569 0 3.37491C0 16.4214 10.5785 26.9999 23.625 26.9999C24.5742 26.9999 25.4074 26.3618 25.6606 25.4442L26.9262 20.8036C27.2057 19.7806 26.6836 18.7101 25.7027 18.304L20.6402 16.1946C19.7807 15.836 18.784 16.0839 18.1986 16.8064L16.0682 19.4062C12.3557 17.6501 9.34981 14.6442 7.59375 10.9317L10.1936 8.80655C10.916 8.21592 11.1639 7.22452 10.8053 6.36495L8.6959 1.30245V1.29717Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_116_39">
                    <rect width="27" height="27" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <a href="tel:0690- 150 90">0690- 150 90</a>
            </span>
        </div>

        <div class="small-container">
            <h2>Hjälp till</h2>
            <router-link to="help-us" class="footer-link">Kontakta oss</router-link>
        </div>
       </div>

        <div class="small-container about-us-container">
            <div class="text-container">
                <h2>Om oss</h2>
                <router-link to="about-us" class="footer-link">Kontakta oss</router-link>
            </div>
        </div>

        <div class="small-container map-container">
            <div class="text-container">
                <h2>Hitta hit</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.7565882442461!2d15.65756787732601!3d62.524872576316476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46659a9a94437657%3A0xe617696279a261cc!2s%C3%85nge%20Folkets%20Hus!5e0!3m2!1ssv!2sse!4v1691936578064!5m2!1ssv!2sse" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <p>
                    Ånge Folkets Hus <br>
                    Centralgatan 20 <br>
                    841 33 Ånge
                </p>
            </div>
        </div>
       </div>
    </div>
</template>

<style scoped>
    .footer-container {
        margin-top: 20px;
        padding: 20px 30px;
    }

    hr {
        color: #ff7b0f;
        margin-bottom: 20px;
    }

    .small-container {
        margin: 30px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    h2 {
        color: #fff;
        font-weight: 600;
        margin-top: 20px;
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

    .link-img {
        max-width: 25px;
    }
    .link-img-path {
        
        fill: #ffffff;
    }

    iframe {
        border-radius: 10px;
        width: 220px;
        height: 160px;
    }

    p {
        color: #fff;
        line-height: 1.75rem;
        margin-bottom: 100px;
    }

    @media screen and (min-width: 320px) {
        iframe {
            border-radius: 10px;
            width: 240px;
            height: 170px;
        }
    }

    @media screen and (min-width: 430px) {
        iframe {
            border-radius: 10px;
            width: 260px;
            height: 180px;
        }
    }

    @media screen and (min-width: 540px) {
        iframe {
            border-radius: 10px;
            width: 280px;
            height: 190px;
        }
    }

    @media screen and (min-width: 650px) {
        iframe {
            border-radius: 10px;
            width: 300px;
            height: 200px;
        }
    }

    @media screen and (min-width: 760px) {
        iframe {
            border-radius: 10px;
            width: 320px;
            height: 210px;
        }
    }

    @media screen and (min-width: 870px) {
        .footer-container {
            padding: 20px 70px;
        }

        iframe {
            border-radius: 10px;
            width: 340px;
            height: 220px;
        }
    }

    @media screen and (min-width: 1200px) {
        .large-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            max-width: 1450px;
            margin: auto;
        }

        .medium-container {
            order: 1;
            width: 100%;
        }

        .map-container {
            order: 2;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .about-us-container {
            order: 3;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: end;
        }

        .text-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        p {
            margin: 0;
        }
    }
</style>