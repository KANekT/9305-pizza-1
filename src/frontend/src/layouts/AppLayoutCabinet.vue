<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ price }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link to="/login" class="header__login" v-if="!isAuth"
          ><span>Войти</span></router-link
        >
        <router-link to="/profile" v-if="isAuth">
          <picture>
            <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>
        <a class="header__logout" v-if="isAuth" @click="logOut"
          ><span>Выйти</span></a
        >
      </div>
    </header>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link
          class="layout__link"
          to="/orders"
          active-class="layout__link--active"
        >
          История заказов</router-link
        >
        <router-link
          class="layout__link"
          to="/profile"
          active-class="layout__link--active"
          >Мои данные</router-link
        >
      </div>

      <transition name="fade" mode="out-in" appear>
        <router-view />
      </transition>
    </main>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutCabinet",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["isAuth"]),
    ...mapGetters("Cart", ["price"]),
  },
  methods: {
    ...mapActions("Auth", ["logOut"]),
  },
};
</script>
