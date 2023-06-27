<script setup lang="ts">
    import { onMounted, ref } from "vue";

    const movies = ref<IMovie[]>([]);

    onMounted(async () => {
        try {
            const response = await axios.get("http://localhost:3000/movie");
            movies.value = response.data;
            console.log(movies.value)
        } catch (error) {
            console.error("Failed to retrieve posters:", error);
        }
    })
</script>

<template>
    
</template>

<style scoped>
.large-container {
  background-color: aliceblue;
  padding: 20px;
}

.small-container {
  padding: 20px;
  max-width: 290px;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

label {
  margin-bottom: 2px;
}

input {
  margin-bottom: 20px;
}
</style>
