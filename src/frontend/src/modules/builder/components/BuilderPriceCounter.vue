<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!pizzaCanCook"
      @click="cookPizza"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    sizes: {
      type: Array,
      default() {
        return [];
      },
    },
    doughs: {
      type: Array,
      default() {
        return [];
      },
    },
    sauces: {
      type: Array,
      default() {
        return [];
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    cookPizza() {
      this.$emit("cookPizza");
    },
  },
  computed: {
    pizzaPrice() {
      if (
        this.sizes.length > 0 &&
        this.doughs.length > 0 &&
        this.sauces.length > 0
      ) {
        let multiplier = this.sizes.find((f) => f.checked).multiplier;
        let dough = this.doughs.find((f) => f.checked).price;
        let sauces = this.sauces.find((f) => f.checked).price;
        let ingredients = this.ingredients.map((m) => m.count * m.price);
        const sum =
          ingredients.length > 0
            ? ingredients.reduce((total, i) => total + i)
            : 0;
        return multiplier * (dough + sauces + sum);
      }
      return 0;
    },
    pizzaCanCook() {
      return this.title.length > 0 && this.ingredients.length > 0;
    },
  },
};
</script>
