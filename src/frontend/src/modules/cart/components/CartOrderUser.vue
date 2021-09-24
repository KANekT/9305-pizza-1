<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="typeAddress">
          <option value="1">Получу сам</option>
          <option value="2">Новый адрес</option>
          <option v-if="isAuth" value="3">Существующий адрес</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          v-model="user.tel"
        />
      </label>

      <div class="cart-form__address" v-if="typeAddress !== '1'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="user.street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="user.house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="user.apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "CartOrderUser",
  data() {
    return {
      typeAddress: "1",
      user: {
        tel: "",
        house: "",
        street: "",
        apartment: "",
      },
    };
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
};
</script>

<style scoped></style>
