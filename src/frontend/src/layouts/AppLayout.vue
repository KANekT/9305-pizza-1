<template>
  <header class="header">
    <div class="header__logo">
      <a href="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">0 ₽</a>
    </div>
    <div class="header__user">
      <a
        href="javascript:void(0);"
        class="header__login"
        v-if="!isAuth"
        @click="logIn"
        ><span>Войти</span></a
      >
      <a href="javascript:void(0);" v-if="isAuth">
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
      </a>
      <a
        href="javascript:void(0);"
        class="header__logout"
        v-if="isAuth"
        @click="logOut"
        ><span>Выйти</span></a
      >
    </div>
  </header>
</template>
<script>
export default {
  name: "AppLayout",
  data() {
    return {
      isAuth: true,
    };
  },
  computed: {},
  methods: {
    logIn() {
      this.isAuth = true;
    },
    logOut() {
      this.isAuth = false;
    },
  },
};
</script>
