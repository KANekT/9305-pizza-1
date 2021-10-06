<template>
  <div id="app">
    <component :is="layout">
      <transition name="slide" mode="out-in" :appear="useAppear">
        <router-view />
      </transition>
    </component>
  </div>
</template>
<script>
import { DEFAULT_LAYOUT } from "@/common/constants.js";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  created() {
    // Note: check auth
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    // Note: fetch initial data
    this.$store.dispatch("init");
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
    useAppear() {
      return this.$route.matched.length === 1;
    },
  },
};
</script>

// Импортируем глобальные стили для приложения
<style lang="scss">
@import "~@/assets/scss/app";
</style>
