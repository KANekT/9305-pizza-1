<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="(additional, index) in additionals"
        :key="additional.id"
      >
        <p class="additional-list__description">
          <img
            :src="additional.src"
            width="39"
            height="60"
            :alt="additional.name"
          />
          <span>{{ additional.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <div class="counter additional-list__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="additional.quantity <= 0"
              @click="update(index, -1)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="additional.quantity"
            />
            <button
              type="button"
              class="
                counter__button counter__button--plus counter__button--orange
              "
              @click="update(index, 1)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>

          <div class="additional-list__price">
            <b>× {{ additional.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TheCartAdditional",
  computed: {
    ...mapState("Cart", ["additionals"]),
  },
  methods: {
    ...mapActions("Cart", ["updateAdditionalCount"]),

    async update(index, value) {
      await this.updateAdditionalCount({ index, value });
    },
  },
};
</script>

<style scoped></style>
