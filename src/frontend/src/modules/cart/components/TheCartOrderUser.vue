<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          v-model="typeAddress"
          @change="changeAddress"
        >
          <option value="-1">Получу сам</option>
          <option value="0">Новый адрес</option>
          <option v-for="addr in address" :value="addr.id" :key="addr.id">
            {{ addr.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <AppInput
          ref="phone"
          v-model="phone"
          type="tel"
          name="phone"
          class="input"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div class="cart-form__address" v-if="+typeAddress >= 0">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              ref="street"
              v-model="street"
              type="text"
              name="street"
              class="input"
              placeholder="Введите название улицы"
              :error-text="validations.street.error"
              :readonly="+typeAddress > 0"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              ref="building"
              v-model="building"
              type="text"
              name="building"
              class="input"
              placeholder="Введите номер дома"
              :error-text="validations.building.error"
              :readonly="+typeAddress > 0"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              ref="flat"
              v-model="flat"
              type="text"
              name="flat"
              class="input"
              placeholder="Введите № квартиры"
              :readonly="+typeAddress > 0"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { cloneDeep } from "lodash";
import { validator } from "@/common/mixins";

export default {
  name: "TheCartOrderUser",
  mixins: [validator],
  data() {
    return {
      typeAddress: -1,
      phone: "",
      building: "",
      street: "",
      flat: "",
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    street() {
      this.$clearValidationErrors();
    },
    building() {
      this.$clearValidationErrors();
    },
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Auth", ["isAuth"]),
    ...mapState("Address", ["address"]),

    isValid() {
      if (
        !this.$validateFields(
          { street: this.street, building: this.building },
          this.validations
        )
      ) {
        this.$emit("isValid", false);
        return false;
      }

      this.$emit("isValid", true);
      return true;
    },
  },
  methods: {
    changeAddress() {
      const type = +this.typeAddress;
      if (type === 0) {
        this.building = "";
        this.street = "";
        this.flat = "";
      } else if (type > 0) {
        const clItem = cloneDeep(
          this.address.find((it) => it.id === +this.typeAddress)
        );

        this.building = clItem.building;
        this.street = clItem.street;
        this.flat = clItem.flat;
      }
    },
  },
};
</script>
