<template>
  <div class="product" :class="css">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ getSize }}, {{ getDough }}</li>
        <li>Соус: {{ getSauce }}</li>
        <li>Начинка: {{ getFilling }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppProduct",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    css: {
      type: String,
      required: false,
    },
  },
  updated() {
    const multiplier = this.sizes.find(
      (it) => it.id === this.product.sizeId
    ).multiplier;
    const dough = this.doughs.find(
      (it) => it.id === this.product.doughId
    ).price;
    const sauce = this.sauces.find(
      (it) => it.id === this.product.sauceId
    ).price;

    const ingredients = this.product.ingredients.map(
      (it) =>
        it.quantity *
          this.ingredients.find((ing) => ing.id === it.ingredientId)?.price ?? 0
    );

    const sum =
      ingredients.length > 0 ? ingredients.reduce((total, i) => total + i) : 0;
    this.setPrice(multiplier * (dough + sauce + sum));
  },
  computed: {
    ...mapState("Builder", ["sizes", "sauces", "doughs", "ingredients"]),

    getDough() {
      switch (this.product.doughId) {
        case 1:
          return "на тонком тесте";
        case 2:
          return "на толстом тесте";
        default:
          return "";
      }
    },

    getSize() {
      return this.sizes.find((it) => it.id === this.product.sizeId)?.name ?? "";
    },

    getSauce() {
      return (
        this.sauces
          .find((it) => it.id === this.product.sauceId)
          ?.name.toLowerCase() ?? ""
      );
    },

    getFilling() {
      const ids = this.product.ingredients.map((it) => it.ingredientId);
      return this.ingredients
        .filter((it) => ids.includes(it.id))
        .map((it) => it.name.toLowerCase())
        .join(", ");
    },
  },
  methods: {
    setPrice(price) {
      this.$emit("update", price);
    },
  },
};
</script>
