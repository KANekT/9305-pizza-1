<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :doughs="doughs"
          @changeDough="changeDough"
        ></BuilderDoughSelector>

        <BuilderSizeSelector
          :sizes="sizes"
          @changeSize="changeSize"
        ></BuilderSizeSelector>

        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          @changeSauce="changeSauce"
          @updateIngredients="updateIngredients"
        ></BuilderIngredientsSelector>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="title"
              required
            />
          </label>

          <BuilderPizzaView
            :foundation="pizzaFoundation"
            :ingredients="pizzaIngredients"
            @addIngredient="addIngredient"
          ></BuilderPizzaView>

          <BuilderPriceCounter
            :title="title"
            :sizes="sizes"
            :doughs="doughs"
            :sauces="sauces"
            :ingredients="ingredientsInPizza"
            @cookPizza="cookPizza"
          ></BuilderPriceCounter>
        </div>
      </div>
    </form>
  </main>
</template>
<script>
//
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
// Импортируем JSON данные и статусы для фильтров.
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import { PIZZA_SIZES_ENUM } from "@/common/constants.js";

import { cloneDeep } from "lodash";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
      sizes: [],
      doughs: [],
      sauces: [],
      ingredients: [],
      title: "",
    };
  },
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  mounted() {
    this.setInitialData();
  },
  methods: {
    setInitialData() {
      this.sizes = this.pizza.sizes.map((m, i) => {
        let clItem = cloneDeep(m);
        clItem.class = PIZZA_SIZES_ENUM[clItem.multiplier];
        clItem.checked = i === 0;
        return clItem;
      });

      this.doughs = this.pizza.dough.map((m, i) => {
        let clItem = cloneDeep(m);
        clItem.value = clItem.image.substring(18);
        clItem.value = clItem.value.substring(0, clItem.value.length - 4);
        clItem.checked = i === 0;
        return clItem;
      });

      this.sauces = this.pizza.sauces.map((m, i) => {
        let clItem = cloneDeep(m);
        clItem.checked = i === 0;
        return clItem;
      });

      this.ingredients = this.pizza.ingredients.map((m) => {
        let clItem = cloneDeep(m);
        clItem.value = clItem.image.substring(20);
        clItem.value = clItem.value.substring(0, clItem.value.length - 4);
        clItem.count = 0;
        return clItem;
      });
    },
    resetData() {
      this.title = "";
      this.sizes.map((m, i) => {
        m.checked = i === 0;
        return m;
      });
      this.doughs.map((m, i) => {
        m.checked = i === 0;
        return m;
      });
      this.sauces.map((m, i) => {
        m.checked = i === 0;
        return m;
      });
      this.ingredients.map((m) => {
        m.count = 0;
        return m;
      });
    },
    changeDough(index) {
      for (let i = 0; i < this.doughs.length; i++) {
        this.doughs[i].checked = i === index;
      }
    },
    changeSize(index) {
      for (let i = 0; i < this.sizes.length; i++) {
        this.sizes[i].checked = i === index;
      }
    },
    changeSauce(index) {
      for (let i = 0; i < this.sauces.length; i++) {
        this.sauces[i].checked = i === index;
      }
    },
    updateIngredients(index, value) {
      this.ingredients[index].count = this.ingredients[index].count + value;
    },
    addIngredient(ingredient) {
      let item = this.ingredients.find((f) => f.id === ingredient.id);
      if (item.count < 3) {
        item.count++;
      }
    },
    cookPizza() {
      this.resetData();
    },
  },
  computed: {
    pizzaFoundation() {
      if (this.doughs.length > 0 && this.sauces.length > 0) {
        return (
          "pizza--foundation--" +
          (this.doughs.find((f) => f.checked).value === "light"
            ? "small"
            : "big") +
          "-" +
          (this.sauces.find((f) => f.checked).id === 1 ? "tomato" : "creamy")
        );
      } else return "pizza--foundation--small-tomato";
    },
    pizzaIngredients() {
      if (this.ingredients.length > 0) {
        return this.ingredientsInPizza.map((m) => {
          let clItem = cloneDeep(m);
          let css = "pizza__filling--" + clItem.value;
          switch (clItem.count) {
            case 2:
              return css + " pizza__filling--second";
            case 3:
              return css + " pizza__filling--third";
            default:
              return css;
          }
        });
      }
      return [];
    },
    ingredientsInPizza() {
      return this.ingredients
        .filter((f) => f.count > 0)
        .map((m) => cloneDeep(m));
    },
  },
};
</script>
