<template>
  <li class="cart-list__item">
    <AppProduct :product="pizza" :css="'cart-list__product'" />

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="pizza.quantity <= 1"
        @click="update(index, -1)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.quantity"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="update(index, 1)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="edit">
        Изменить
      </button>
      <button type="button" class="cart-list__edit" @click="remove">
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartPizzaInfo",
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    pizza: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    price() {
      return this.pizza.quantity * this.pizza.price;
    },
  },
  methods: {
    ...mapActions("Builder", ["editPizza"]),
    ...mapActions("Cart", ["updatePizzaCount", "deletePizza"]),

    async update(index, value) {
      await this.updatePizzaCount({ index, value });
    },

    async edit() {
      await this.editPizza(this.pizza);
      await this.$router.push("/");
    },

    async remove() {
      if (
        confirm(`Вы действительно хотите удалить пиццу "${this.pizza.title}"?`)
      ) {
        await this.deletePizza(this.pizza.id);
      }
    },
  },
};
</script>
