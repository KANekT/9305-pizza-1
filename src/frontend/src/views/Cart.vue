<template>
  <div>
    <form @submit.prevent="onSubmit" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div class="sheet cart__empty" v-if="isEmpty">
            <p>В корзине нет ни одного товара</p>
          </div>

          <TheCartPizzas v-if="!isEmpty" />
          <TheCartAdditional v-if="!isEmpty" />
          <TheCartOrderUser v-if="!isEmpty" @setAddress="setAddress" />
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <a
            class="button button--border button--arrow"
            @click.prevent.self="toBuilder"
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
          <button type="submit" class="button" :disabled="!isValidForm">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <router-view />
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapState, mapGetters, mapActions } from "vuex";
//
import TheCartPizzas from "@/modules/cart/components/TheCartPizzas.vue";
import TheCartAdditional from "@/modules/cart/components/TheCartAdditional.vue";
import TheCartOrderUser from "@/modules/cart/components/TheCartOrderUser.vue";

export default {
  name: "Cart",
  data() {
    return {
      isValidForm: false,
      address: {},
      phone: "",
    };
  },
  components: {
    TheCartPizzas,
    TheCartAdditional,
    TheCartOrderUser,
  },
  async created() {
    if (this.isAuth) {
      await this.getAddresses();
    }
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "price"]),
    ...mapGetters("Auth", ["isAuth"]),
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["pizzas", "additionals"]),
  },
  methods: {
    ...mapActions("Builder", ["clearPizza"]),
    ...mapActions("Address", ["getAddresses"]),
    ...mapActions("Orders", ["addOrder"]),

    setAddress(event) {
      const { address, phone } = event;
      if (address) {
        this.address = address;
        this.phone = phone;
        this.isValidForm = true;
      } else {
        this.address = {};
        this.phone = "";
        this.isValidForm = false;
      }
    },

    async onSubmit() {
      const order = {
        userId: this.isAuth ? this.user.id : null,
        phone: this.phone,

        pizzas: this.pizzas.map((it) => {
          return {
            name: it.name,
            sauceId: it.sauceId,
            doughId: it.doughId,
            sizeId: it.sizeId,
            quantity: it.quantity,
            ingredients: it.ingredients.map((ing) => {
              return {
                ingredientId: ing.ingredientId,
                quantity: ing.quantity,
              };
            }),
          };
        }),
        misc: this.additionals
          .filter((it) => it.quantity > 0)
          .map((it) => {
            return {
              miscId: it.id,
              quantity: it.quantity,
            };
          }),
      };

      if (this.address.id >= 0) {
        order.address = cloneDeep(this.address);
        order.address.id = +order.address.id > 0 ? +order.address.id : null;
      }

      await this.addOrder(order);
      await this.$router.push("/order_placed");
    },

    toBuilder() {
      this.clearPizza();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
