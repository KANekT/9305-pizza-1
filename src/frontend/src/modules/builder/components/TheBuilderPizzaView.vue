<template>
  <div class="content__constructor">
    <AppDrop @drop="add">
      <div class="pizza" :class="foundation">
        <div class="pizza__wrapper">
          <transition-group name="ingredients">
            <div
              class="pizza__filling"
              :class="filling.css"
              v-for="filling in fillings"
              :key="filling.id"
            ></div
          ></transition-group>
        </div></div
    ></AppDrop>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "TheBuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapState("Builder", ["doughs", "sauces"]),
    ...mapGetters("Builder", ["isFillState", "ingredientsInPizza"]),

    foundation() {
      if (this.isFillState) {
        const cssDough =
          this.doughs.find((it) => it.checked).value === "light"
            ? "small"
            : "big";
        const cssSauce =
          this.sauces.find((it) => it.checked).id === 1 ? "tomato" : "creamy";

        return `pizza--foundation--${cssDough}-${cssSauce}`;
      } else return "pizza--foundation--small-tomato";
    },

    fillings() {
      if (this.isFillState) {
        return this.ingredientsInPizza.map((it) => {
          const css = "pizza__filling--" + it.value;
          switch (it.quantity) {
            case 2:
              return {
                id: it.id * 10 + 2,
                css: css + " pizza__filling--second",
              };
            case 3:
              return {
                id: it.id * 10 + 3,
                css: css + " pizza__filling--third",
              };
            default:
              return {
                id: it.id * 10 + 1,
                css: css,
              };
          }
        });
      }
      return [];
    },
  },
  methods: {
    ...mapActions("Builder", ["addIngredient"]),

    add(ingredient) {
      this.addIngredient(ingredient);
    },
  },
};
</script>

<style lang="scss" scoped>
// Transitions
.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.5s ease;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
