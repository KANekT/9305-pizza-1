<template>
  <div>
    <form v-on:submit.prevent="onSubmit" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div class="sheet cart__empty" v-if="isEmpty">
            <p>В корзине нет ни одного товара</p>
          </div>

          <TheCartPizzas v-if="!isEmpty"></TheCartPizzas>
          <TheCartAdditional v-if="!isEmpty"></TheCartAdditional>
          <TheCartOrderUser v-if="!isEmpty"></TheCartOrderUser>
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <a
            href="javascript:void(0);"
            class="button button--border button--arrow"
            @click="toBuilder"
            >Хочу еще одну</a
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ price }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="submit" class="button" @click="onSubmit">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//
import TheCartPizzas from "@/modules/cart/components/TheCartPizzas.vue";
import TheCartAdditional from "@/modules/cart/components/TheCartAdditional.vue";
import TheCartOrderUser from "@/modules/cart/components/TheCartOrderUser.vue";

export default {
  name: "Cart",
  components: {
    TheCartPizzas,
    TheCartAdditional,
    TheCartOrderUser,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "price"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("Builder", ["clearPizza"]),
    ...mapActions("Cart", ["clear"]),

    async onSubmit() {
      await this.$router.push("/order_placed");
    },

    async toBuilder() {
      await this.clearPizza();
      await this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
