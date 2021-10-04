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
  name: "TheBuilderPriceCounter",
  methods: {
    ...mapActions("Builder", ["getAllData", "getPizza"]),
    ...mapActions("Cart", ["addPizza"]),

    async cookPizza() {
      const pizza = await this.getPizza();
      this.addPizza(pizza);
      await this.getAllData();
      await this.$router.push("/cart");
    },
  },
  computed: {
    ...mapGetters("Builder", ["price", "canCook"]),
  },
};
</script>
