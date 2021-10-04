<template>
  <div class="layout__address">
    <div class="sheet address-form" v-if="address.isCollapsed">
      <div class="address-form__header">
        <b>Адрес №{{ address.id }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="edit">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.street }}, д. {{ address.building }}{{ flatText }}</p>
      <small v-if="!isEmptyComment">{{ address.comment }}</small>
    </div>
    <form
      @submit.prevent="onSubmit"
      class="address-form address-form--opened sheet"
      v-if="!address.isCollapsed"
    >
      <div class="address-form__header">
        <b>Адрес №{{ address.id }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <AppInput
              ref="name"
              v-model="name"
              type="text"
              name="name"
              class="input"
              placeholder="Введите название адреса"
              :error-text="validations.name.error"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
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
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
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
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              ref="flat"
              v-model="flat"
              type="text"
              name="flat"
              class="input"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <AppInput
              ref="comment"
              v-model="comment"
              type="text"
              name="comment"
              class="input"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="remove"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validator } from "@/common/mixins";
import { mapActions } from "vuex";

export default {
  name: "AddressForm",
  mixins: [validator],
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data: () => ({
    id: null,
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
    validations: {
      name: {
        error: "",
        rules: ["required"],
      },
      street: {
        error: "",
        rules: ["required"],
      },
      building: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  watch: {
    name() {
      this.$clearValidationErrors();
    },
    street() {
      this.$clearValidationErrors();
    },
    building() {
      this.$clearValidationErrors();
    },
  },
  computed: {
    flatText() {
      return this.address.flat.length > 0 ? `, кв. ${this.address.flat}` : "";
    },
    isEmptyComment() {
      return this.address.comment?.length === 0;
    },
  },
  methods: {
    ...mapActions("Address", ["editAddress", "deleteAddress"]),

    edit() {
      this.address.isCollapsed = false;
      this.$data.id = this.address.id;
      this.$data.name = this.address.name;
      this.$data.street = this.address.street;
      this.$data.building = this.address.building;
      this.$data.flat = this.address.flat;
      this.$data.comment = this.address.comment;
    },

    async remove() {
      if (
        confirm(`Вы действительно хотите удалить адрес ${this.address.name} ?`)
      ) {
        await this.deleteAddress(this.address.id);
      }
    },

    async onSubmit() {
      if (
        !this.$validateFields(
          { name: this.name, street: this.street, building: this.building },
          this.validations
        )
      ) {
        return;
      }

      const address = {
        id: this.id,
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };
      const index = this.index;
      await this.editAddress({ address, index });
    },
  },
};
</script>
