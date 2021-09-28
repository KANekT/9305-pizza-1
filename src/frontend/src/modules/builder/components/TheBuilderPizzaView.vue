<template>
  <div class="content__constructor">
    <AppDrop @drop="add">
      <div class="pizza" :class="foundation">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            :class="filling.css"
            v-for="filling in fillings"
            :key="filling.id"
          ></div>
        </div></div
    ></AppDrop>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "TheBuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapGetters("Builder", ["foundation", "fillings"]),
  },
  methods: {
    ...mapActions("Builder", ["addIngredient"]),

    async add(ingredient) {
      await this.addIngredient(ingredient);
    },
  },
};
</script>
