<template>
  <transition name="fade" appear
    ><div class="sign-form">
      <a
        href="#"
        class="close close--white"
        @click.prevent.self="$router.back()"
      >
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </a>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <AppInput
              ref="email"
              v-model="email"
              type="email"
              name="email"
              class="input"
              placeholder="E-mail"
              :error-text="validations.email.error"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <AppInput
              v-model="password"
              type="password"
              name="password"
              class="input"
              placeholder="Пароль"
              :error-text="validations.password.error"
            />
          </label>
        </div>
        <button type="submit" class="button">Авторизоваться</button>
      </form>
    </div></transition
  >
</template>

<script>
import { validator } from "@/common/mixins";
import { mapActions } from "vuex";

export default {
  name: "Login",
  mixins: [validator],
  data: () => ({
    email: "",
    password: "",
    validations: {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    },
  }),
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    ...mapActions("Auth", ["logIn"]),

    async onSubmit() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }

      await this.logIn({
        email: this.email,
        password: this.password,
      });
      await this.$router.back();
    },
  },
};
</script>

<style scoped></style>
