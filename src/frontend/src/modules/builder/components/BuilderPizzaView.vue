<template>
  <div class="content__constructor">
    <AppDrop @drop="add($event)">
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
import { mapGetters, mapActions } from "vuex";

import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapGetters("Builder", ["foundation", "ingredients"]),
  },
  methods: {
    ...mapActions("Builder", ["addIngredient"]),

    async add(ingredient) {
      await this.addIngredient(ingredient);
    },
  },
};
</script>
