<template>
  <div class="popup">
    <a href="javascript:void(0);" class="close" @click="order">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a href="javascript:void(0);" class="button" @click="order"
        >Отлично, я жду!</a
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Thanks",
  computed: {
    ...mapGetters("Auth", ["isAuth"]),

    getUrl(){
      return this.isAuth ? "/orders" : "/"
    }
  },
  methods: {
    ...mapActions("Cart", ["clear"]),

    async order() {
      await this.clear();
      await this.$router.push(this.getUrl);
    },
  },
};
</script>

<style scoped></style>
