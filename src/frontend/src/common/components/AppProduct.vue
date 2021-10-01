<template>
  <li :class="isOrder ? 'order__item' : 'cart-list__item'">
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
    <slot />

    <p class="order__price" v-if="isOrder">{{ getPrice }} ₽</p>
    <div class="cart-list__price" v-if="!isOrder">
      <b>{{ getPrice }} ₽</b>
    </div>

    <slot name="action" />
  </li>
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
    isOrder: {
      type: Boolean,
      required: true,
      default: false,
    },
    css: {
      type: String,
      required: false,
    },
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
      const ids = this.product?.ingredients.map((it) => it.ingredientId) ?? [];
      return this.ingredients
        .filter((it) => ids.includes(it.id))
        .map((it) => it.name.toLowerCase())
        .join(", ");
    },

    getPrice() {
      const multiplier =
        this.sizes?.find((it) => it.id === this.product.sizeId).multiplier ?? 0;
      const dough =
        this.doughs?.find((it) => it.id === this.product.doughId).price ?? 0;
      const sauce =
        this.sauces?.find((it) => it.id === this.product.sauceId).price ?? 0;

      const ingredients = this.product.ingredients.map(
        (it) =>
          it.quantity *
            this.ingredients.find((ing) => ing.id === it.ingredientId)?.price ??
          0
      );

      const sum =
        ingredients.length > 0
          ? ingredients.reduce((total, i) => total + i)
          : 0;
      return multiplier * (dough + sauce + sum);
    },
  },
};
</script>
