<template>
  <transition name="popup" appear
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

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: 0.5s;
}
.popup-enter {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}
.popup-leave-to {
  transform: translate(-50%, -50%) scale(1.2);
  opacity: 0;
}
</style>
