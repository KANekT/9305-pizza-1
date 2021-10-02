<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <OrderView v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//
import OrderView from "@/modules/orders/components/OrderView.vue";

export default {
  name: "Orders",
  components: { OrderView },
  async created() {
    await this.getOrders();
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  methods: {
    ...mapActions("Orders", ["getOrders"]),
  },
};
</script>
