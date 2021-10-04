<template>
  <transition name="slide" mode="out-in" appear>
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "AppLayoutWithoutHeader",
};
</script>

<style scoped></style>
