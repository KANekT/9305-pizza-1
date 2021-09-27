<template>
  <ul class="cart-list sheet">
    <li
      class="cart-list__item"
      v-for="(pizza, index) in pizzas"
      :key="pizza.id"
    >
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
            <li>
              Начинка: {{ pizza.ingredients.map((m) => m.name).join(", ") }}
            </li>
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
        <b>{{ pizza.count * pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit" @click="edit(pizza)">
          Изменить
        </button>
        <button type="button" class="cart-list__edit" @click="remove(pizza)">
          Удалить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CartPizzas",
  computed: {
    ...mapState("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Builder", ["editPizza"]),
    ...mapActions("Cart", ["updatePizza", "deletePizza"]),

    async update(index, value) {
      await this.updatePizza({ index, value });
    },

    async edit(pizza) {
      await this.editPizza(pizza);
      await this.$router.push("/");
    },

    async remove(pizza) {
      if (
        confirm("Вы действительно хотите удалить пиццу " + pizza.title + "?")
      ) {
        await this.deletePizza(pizza.id);
      }
    },
  },
};
</script>

<style scoped></style>
