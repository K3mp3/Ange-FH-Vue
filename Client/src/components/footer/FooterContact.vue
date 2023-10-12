<script setup lang="ts">
</script>

<template>
    <div class="info-container">
        <div class="content-container">
            <h2>Kontakta oss</h2>
            <router-link to="contact-us" class="footer-link">Kontakta oss</router-link>
            <span>
                <svg width="19" height="19" viewBox="0 0 512 512" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" class="link-img-path"/></svg>
                <a href="mailto:info@angefolketshus.se">info@angefolketshus.se</a>
            </span>
            <span>
                <svg width="19" height="19" viewBox="0 0 27 27" class="link-img" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_116_39)">
                    <path d="M8.6959 1.29717C8.28984 0.316314 7.21934 -0.205757 6.19629 0.0737354L1.55566 1.33936C0.638086 1.59249 0 2.42569 0 3.37491C0 16.4214 10.5785 26.9999 23.625 26.9999C24.5742 26.9999 25.4074 26.3618 25.6606 25.4442L26.9262 20.8036C27.2057 19.7806 26.6836 18.7101 25.7027 18.304L20.6402 16.1946C19.7807 15.836 18.784 16.0839 18.1986 16.8064L16.0682 19.4062C12.3557 17.6501 9.34981 14.6442 7.59375 10.9317L10.1936 8.80655C10.916 8.21592 11.1639 7.22452 10.8053 6.36495L8.6959 1.30245V1.29717Z" class="link-img-path"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_116_39">
                    <rect width="27" height="27" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <a href="tel:0690- 150 90" class="a-phone-number">0690- 150 90</a>
            </span>
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
        width: 100%;
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
        max-width: 18px;
    }
    .link-img-path {
        fill: #ffffff;
    }
}

@media screen and (min-width: 860px) {
    .info-container {
        display: flex;
        align-items: center;
        .content-container {
            width: 55%;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
}

@media screen and (min-width: 1200px) {
    .info-container {
        display: flex;
        justify-content: end;
        align-items: center;
        
        .content-container {
            display: flex;
            gap: 10px;
        }

        h2 {
            margin-top: 0px;
        }
    }
}
</style>