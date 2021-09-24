<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div class="sheet cart__empty" v-if="isEmpty">
            <p>В корзине нет ни одного товара</p>
          </div>

          <CartPizzas v-if="!isEmpty"></CartPizzas>
          <CartAdditional v-if="!isEmpty"></CartAdditional>
          <CartOrderUser v-if="!isEmpty"></CartOrderUser>
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <router-link to="/" class="button button--border button--arrow"
            >Хочу еще одну</router-link
          >
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ price }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="button" class="button" @click="order">
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
import CartPizzas from "@/modules/cart/components/CartPizzas.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartOrderUser from "@/modules/cart/components/CartOrderUser.vue";

export default {
  name: "Cart",
  components: {
    CartPizzas,
    CartAdditional,
    CartOrderUser,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "price"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("Cart", ["clear"]),

    async order() {
      await this.$router.push("/order_placed");
    },
  },
};
</script>

<style scoped></style>
