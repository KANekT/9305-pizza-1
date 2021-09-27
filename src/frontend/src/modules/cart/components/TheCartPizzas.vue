<template>
  <ul class="cart-list sheet">
    <CartPizzaInfo
      v-for="(pizza, index) in pizzas"
      :key="pizza.id"
      :pizza="pizza"
      :index="index"
    ></CartPizzaInfo>
  </ul>
</template>

<script>
import { mapState } from "vuex";
//
import CartPizzaInfo from "@/modules/cart/components/CartPizzaInfo.vue";

export default {
  name: "TheCartPizzas",
  components: {
    CartPizzaInfo,
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
};
</script>

<style scoped></style>
