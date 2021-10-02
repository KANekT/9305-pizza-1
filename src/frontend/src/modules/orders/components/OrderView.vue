<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ getTotal }}₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="remove(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="clone(order.id)">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <AppProduct
        :product="pizza"
        :isOrder="true"
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
      />
    </ul>

    <ul class="order__additional">
      <OrderMisc v-for="misc in order.orderMisc" :misc="misc" :key="misc.id" />
    </ul>

    <p class="order__address" v-if="order.addressId">
      Адрес доставки: {{ order.orderAddress.name }}
    </p>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
//
import OrderMisc from "@/modules/orders/components/OrderMisc.vue";
import { getPizzaPrice } from "@/common/helpers";

export default {
  name: "OrderView",
  components: { OrderMisc },
  props: {
    order: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["sizes", "doughs", "sauces", "ingredients"]),
    ...mapState("Cart", ["additionals"]),

    getTotal() {
      const pizzas = this.order.orderPizzas.map(
        (it) =>
          it.quantity *
          getPizzaPrice(
            it,
            this.sizes,
            this.doughs,
            this.sauces,
            this.ingredients
          )
      );
      if (this.order.orderMisc) {
        const miscs = this.additionals;
        const misc = this.order.orderMisc.map((it) => {
          const price = miscs.find((m) => m.id === it.miscId)?.price ?? 0;
          return it.quantity * price;
        });

        return (
          pizzas.reduce((total, i) => total + i) +
          misc.reduce((total, i) => total + i)
        );
      }

      return pizzas.reduce((total, i) => total + i);
    },
  },
  methods: {
    ...mapActions("Orders", ["cloneOrder", "deleteOrder"]),

    async clone(id) {
      const item = this.orders.find((it) => it.id === id);
      await this.cloneOrder(item);
    },

    async remove(id) {
      if (confirm(`Подтвердите удаление заказа №${id}`)) {
        await this.deleteOrder(id);
      }
    },
  },
};
</script>
