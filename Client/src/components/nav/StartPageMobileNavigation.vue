<script  lang="ts" setup="">
   const links: string[] = ["Filmer", "Evenemang", "Om oss", "Kontakt"];

   function getRoute(link: string) {
        const trimmedLink = link.trim().replace(/\s/g, "").toLowerCase();
        return `/${trimmedLink}`;
    }

  defineProps<{
    isOpen: boolean;
  }>();
</script>

<template>
 <nav :class="{'open' : isOpen}">
  <div class="navigation-container">
    <ul>
      <li v-for="link in links"><router-link :to="getRoute(link)" class="router-link">{{ link }}</router-link></li>
    </ul>
  </div>
</nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  right: -100%; /* hide menu outside right side of screen*/
  height: 100vh;
  padding: 20px;
  transition: right .4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
nav.open {
  
  right: 0;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 20px;
}

li {
    list-style: none;
}

.router-link {
    text-decoration: none;
}
</style>
