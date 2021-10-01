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
          <span>Сумма заказа: {{}}₽</span>
        </div>

        <div class="order__button">
          <button type="button" class="button button--border">Удалить</button>
        </div>
        <div class="order__button">
          <button type="button" class="button">Повторить</button>
        </div>
      </div>

      <ul class="order__list">
        <li
          class="order__item"
          v-for="pizza in order.orderPizzas"
          :key="pizza.id"
        >
          <AppProduct :product="pizza" @update="pizza.price = $event.value" />

          <p class="order__price">{{ pizza.price }} ₽</p>
        </li>
      </ul>

      <ul class="order__additional">
        <li>
          <img
            src="@/assets/img/cola.svg"
            width="20"
            height="30"
            alt="Coca-Cola 0,5 литра"
          />
          <p>
            <span>Coca-Cola 0,5 литра</span>
            <b>56 ₽</b>
          </p>
        </li>
        <li>
          <img
            src="@/assets/img/sauce.svg"
            width="20"
            height="30"
            alt="Острый соус"
          />
          <span>Острый соус <br />30 ₽</span>
        </li>
        <li>
          <img
            src="@/assets/img/potato.svg"
            width="20"
            height="30"
            alt="Картошка из печи"
          />
          <p>
            <span>Картошка из печи</span>
            <b>170 ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Orders",
  async created() {
    await this.getOrders();
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapState("Builder", ["sizes", "sauces", "ingredients"]),
  },
  methods: {
    ...mapActions("Orders", ["getOrders", "deleteOrder"]),

    async delete() {
      await this.deleteOrder(0);
    },

    updatePizza(pizza) {
      console.log(pizza);
    },
  },
};
</script>

<style scoped></style>
