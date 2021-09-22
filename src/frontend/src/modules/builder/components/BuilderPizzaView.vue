<template>
  <div class="content__constructor">
    <AppDrop @drop="addIngredient($event)">
      <div class="pizza" :class="foundation">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            :class="css"
            v-for="(css, index) in ingredients"
            :key="index"
          ></div>
        </div></div
    ></AppDrop>
  </div>
</template>
<script>
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",
  props: {
    foundation: {
      type: String,
      default() {
        return "pizza--foundation--small-tomato";
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { AppDrop },
  methods: {
    addIngredient(ingredient) {
      this.$emit("addIngredient", ingredient);
    },
  },
};
</script>
