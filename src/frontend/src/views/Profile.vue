<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <AddressForm
      v-for="(addr, index) in address"
      :key="addr.id"
      :address="addr"
      :index="index"
    ></AddressForm>

    <div class="layout__button">
      <button type="button" class="button button--border" @click="add">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
//
import AddressForm from "@/modules/address/components/AddressForm.vue";

export default {
  name: "Profile",
  components: {
    AddressForm,
  },
  async created() {
    await this.getAddresses();
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Address", ["address"]),
  },
  methods: {
    ...mapActions("Address", ["getAddresses", "editAddress"]),

    async add() {
      await this.editAddress({});
    },
  },
};
</script>
