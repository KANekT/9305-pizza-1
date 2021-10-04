<template>
  <transition name="fade" mode="out-in" appear>
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "AppLayoutWithoutHeader",
};
</script>

<style scoped></style>
