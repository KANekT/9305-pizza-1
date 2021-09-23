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
    ...mapActions("Builder", ["query"]),

    async cookPizza() {
      await this.query();
    },
  },
  computed: {
    ...mapGetters("Builder", ["price", "canCook"]),
  },
};
</script>
