<template>
  <li>
    <img :src="additional.src" width="20" height="30" :alt="additional.name" />
    <p>
      <span>{{ additional.name }}</span>
      <b>{{ getPrice }} ₽</b>
    </p>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OrderMisc",
  props: {
    misc: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState("Cart", ["additionals"]),

    additional() {
      return this.additionals.find((it) => it.id === this.misc.miscId);
    },

    getPrice() {
      return this.misc.quantity > 1
        ? `${this.misc.quantity} X ${this.additional.price}`
        : `${this.additional.price}`;
    },
  },
};
</script>
