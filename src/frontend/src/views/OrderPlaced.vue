<template>
  <transition name="fade" appear
    ><div class="popup" v-if="isShow">
      <a class="close" @click.prevent.self="order">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a class="button" @click.prevent.self="order">Отлично, я жду!</a>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Thanks",
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapGetters("Auth", ["isAuth"]),

    getUrl() {
      return this.isAuth ? "/orders" : "/";
    },
  },
  methods: {
    ...mapActions("Cart", ["clearData"]),

    order() {
      this.isShow = false;
      setTimeout(() => {
        this.clearData();
        this.$router.push(this.getUrl);
      }, 500);
    },
  },
};
</script>
