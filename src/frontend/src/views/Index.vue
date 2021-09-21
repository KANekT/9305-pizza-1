<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                class="dough__input"
                :class="`dough__input--${dough.value}`"
                v-for="(dough, index) in doughs"
                :key="index"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="dough.value"
                  :checked="index === 0"
                  class="visually-hidden"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                class="diameter__input"
                :class="`diameter__input--${size.class}`"
                v-for="(size, index) in sizes"
                :key="index"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.value"
                  :checked="index === 0"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  class="radio ingredients__input"
                  v-for="(sauce, index) in pizza.sauces"
                  :key="index"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="index"
                    :checked="index === 0"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    class="ingredients__item"
                    v-for="(ingredient, index) in ingredients"
                    :key="index"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.value}`"
                      >{{ ingredient.name }}</span
                    >

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--disabled
                          counter__button--minus
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<script>
// Импортируем JSON данные и статусы для фильтров.
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import { pizzaSizesEnum } from "@/common/pizzaEnum.js";

import { cloneDeep } from "lodash";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
  computed: {
    sizes() {
      return this.pizza.sizes.map((m) => {
        let clItem = cloneDeep(m);
        clItem.value = pizzaSizesEnum[clItem.multiplier];
        return clItem;
      });
    },
    doughs() {
      return this.pizza.dough.map((m) => {
        let clItem = cloneDeep(m);
        clItem.value = clItem.image.substring(18);
        clItem.value = clItem.value.substring(0, clItem.value.length - 4);
        return clItem;
      });
    },
    ingredients() {
      return this.pizza.ingredients.map((m) => {
        let clItem = cloneDeep(m);
        clItem.value = clItem.image.substring(20);
        clItem.value = clItem.value.substring(0, clItem.value.length - 4);
        return clItem;
      });
    },
  },
};
</script>

// Импортируем стили фильтров, колонок и задач отдельными файлами // Позже они
будут вынесены в отдельные компоненты
<style lang="scss" scoped>
//@import "~@/assets/scss/blocks/meta-filter.scss";
//@import "~@/assets/scss/blocks/user-filter.scss";
//@import "~@/assets/scss/blocks/column.scss";
//@import "~@/assets/scss/blocks/task.scss";
</style>
