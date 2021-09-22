<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            class="radio ingredients__input"
            v-for="(sauce, index) in sauces"
            :key="index"
          >
            <input
              type="radio"
              name="sauce"
              :value="index"
              :checked="sauce.checked"
              @change="changeSauce(index)"
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
              <AppDrag :transferData="ingredient">
                <span class="filling" :class="`filling--${ingredient.value}`">{{
                  ingredient.name
                }}</span>
              </AppDrag>

              <div class="counter counter--orange ingredients__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  :disabled="ingredient.count <= 0"
                  @click="updateIngredients(index, -1)"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  :value="ingredient.count"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus"
                  :disabled="ingredient.count >= 3"
                  @click="updateIngredients(index, 1)"
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
</template>
<script>
import AppDrag from "@/common/components/AppDrag.vue";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    sauces: {
      type: Array,
      default() {
        return [];
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { AppDrag },
  methods: {
    changeSauce(index) {
      this.$emit("changeSauce", index);
    },
    updateIngredients(index, value) {
      this.$emit("updateIngredients", index, value);
    },
  },
};
</script>
