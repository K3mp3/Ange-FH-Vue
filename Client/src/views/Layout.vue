<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { useShowNav } from "@/stores/showNav";
  import NavView from "./NavView.vue";
  import FooterView from "./FooterView.vue";

  const showNav = ref();

  const nav = computed(() => useShowNav().showNav)

  onMounted(() => {
    console.log("nav:", nav.value);

    showNav.value = nav.value;
  })
</script>

<template>
  <div>
      <div class="nav-view" v-if="showNav">
        <NavView></NavView>
      </div>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <FooterView></FooterView>
    </footer>
  </div>
</template>