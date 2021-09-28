<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ pizza.title }}</h2>
        <ul>
          <li>{{ pizza.size.name }}, {{ pizza.dough.name }}</li>
          <li>Соус: {{ pizza.sauce.name }}</li>
          <li>Начинка: {{ filling }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="pizza.count <= 1"
        @click="update(index, -1)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.count"
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
    },
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filling() {
      return this.pizza.ingredients.map((it) => it.name).join(", ");
    },
    price() {
      return this.pizza.count * this.pizza.price;
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
