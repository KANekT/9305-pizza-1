<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section class="sheet order" v-for="order in orders" :key="order.id">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order.id }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: ₽</span>
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
        <OrderMisc
          v-for="misc in order.orderMisc"
          :misc="misc"
          :key="misc.id"
        />
      </ul>

      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//
import OrderMisc from "@/modules/orders/components/OrderMisc.vue";

export default {
  name: "Orders",
  components: { OrderMisc },
  async created() {
    await this.getOrders();
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["sizes", "sauces", "ingredients"]),
    ...mapState("Cart", ["additionals"]),
  },
  methods: {
    ...mapActions("Orders", ["getOrders", "cloneOrder", "deleteOrder"]),

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

<style scoped></style>
