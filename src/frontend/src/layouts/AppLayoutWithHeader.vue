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
        <router-link :to="linkToAuth" class="header__login" v-if="!isAuth"
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
    <slot />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutWithHeader",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["isAuth"]),
    ...mapGetters("Cart", ["price"]),

    linkToAuth() {
      return this.$route.name === "Index" ? "/login" : "/auth";
    },
  },
  methods: {
    ...mapActions("Auth", ["logOut"]),
  },
};
</script>
