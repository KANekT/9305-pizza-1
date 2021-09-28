<template>
  <div id="app">
    <component :is="layout"> </component>
  </div>
</template>
<script>
import { DEFAULT_LAYOUT } from "@/common/constants.js";

export default {
  name: "App",
  created() {
    // Note: fetch initial data
    this.$store.dispatch("init");
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
