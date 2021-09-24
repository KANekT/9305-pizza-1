<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!canCook"
      @click="cookPizza"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  methods: {
    ...mapActions("Builder", ["query", "pizza"]),
    ...mapActions("Cart", ["add"]),

    async cookPizza() {
      await this.add(await this.pizza());
      await this.query();
      await this.$router.push("/cart");
    },
  },
  computed: {
    ...mapGetters("Builder", ["price", "canCook"]),
  },
};
</script>
