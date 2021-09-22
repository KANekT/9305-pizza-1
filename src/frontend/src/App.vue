<template>
  <div id="app">
    <AppLayout />
    <Index />
  </div>
</template>
<script>
import AppLayout from "@/layouts/AppLayout";
import Index from "@/views/Index";

export default {
  name: "App",
  components: {
    Index,
    AppLayout,
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
