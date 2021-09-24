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
            <source
              type="image/webp"
              srcset="
                @/assets/img/users/user5.webp    1x,
                @/assets/img/users/user5@2x.webp 2x
              "
            />
            <img
              src="@/assets/img/users/user5.jpg"
              srcset="@/assets/img/users/user5@2x.jpg"
              alt="Василий Ложкин"
              width="32"
              height="32"
            />
          </picture>
          <span>Василий Ложкин</span>
        </router-link>
        <a class="header__logout" v-if="isAuth" @click="logOut"
          ><span>Выйти</span></a
        >
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppLayoutWithHeader",
  computed: {
    ...mapGetters("Auth", ["isAuth"]),
    ...mapGetters("Cart", ["price"]),
  },
  methods: {
    ...mapActions("Auth", ["logOut"]),
  },
};
</script>
