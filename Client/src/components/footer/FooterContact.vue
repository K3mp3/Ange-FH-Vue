<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <h2>Kontakt</h2>
        <router-link to="contact-us" class="footer-link">Kontakta oss</router-link>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="link-img"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" class="link-img-path"/>
            </svg>
            <a href="mailto:info@angefolketshus.se">info@angefolketshus.se</a>
        </span>
        <span>
            <svg width="27" height="27" viewBox="0 0 27 27" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</template>

<style scoped setup lang="scss">
        .info-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;

            h2 {
                color: #fff;
                font-weight: 600;
                font-size: 1.5rem;
            }
        
            .footer-link {
                color: #fff;
                font-size: 0.9rem;
            }

            span {
                display: flex;
                gap: 10px;
                margin: 5px 0;
                font-size: 0.9rem;
            }

            a {
                color: #fff;
                font-size: 0.9rem;
            }
            
            .link-img {
                max-width: 20px;
            }
            .link-img-path {
                fill: #ffffff;
            }
        }
</style>