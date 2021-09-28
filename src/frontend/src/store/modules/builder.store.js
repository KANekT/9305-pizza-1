import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import {
  capitalize,
  createID,
  setCheckedByIndex,
  setCheckedById,
} from "@/common/helpers";
import { cloneDeep } from "lodash";
import {
  SET_DATA,
  UPDATE_DOUGHS,
  UPDATE_SIZES,
  UPDATE_SAUCES,
  UPDATE_TITLE,
  UPDATE_ENTITY,
} from "@/store/mutations-types";
import { PIZZA_SIZES_ENUM } from "@/common/constants";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    id: 1,
    title: "",
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
  },

  getters: {
    isFillState(state) {
      return (
        state.sizes.length > 0 &&
        state.doughs.length > 0 &&
        state.sauces.length > 0
      );
    },
    foundation(state, getters) {
      if (getters.isFillState) {
        const cssDough =
          state.doughs.find((it) => it.checked).value === "light"
            ? "small"
            : "big";
        const cssSauce =
          state.sauces.find((it) => it.checked).id === 1 ? "tomato" : "creamy";

        return `pizza--foundation--${cssDough}-${cssSauce}`;
      } else return "pizza--foundation--small-tomato";
    },
    fillings(state, getters) {
      if (getters.isFillState) {
        return getters.ingredientsInPizza.map((it) => {
          const clItem = cloneDeep(it);
          let css = "pizza__filling--" + clItem.value;
          switch (clItem.count) {
            case 2:
              return {
                id: 2,
                css: css + " pizza__filling--second",
              };
            case 3:
              return {
                id: 3,
                css: css + " pizza__filling--third",
              };
            default:
              return {
                id: 1,
                css: css,
              };
          }
        });
      }
      return [];
    },
    ingredientsInPizza(state) {
      return state.ingredients.filter((it) => it.count > 0).map(cloneDeep);
    },
    price(state, getters) {
      if (getters.isFillState) {
        const multiplier = state.sizes.find((it) => it.checked).multiplier;
        const dough = state.doughs.find((it) => it.checked).price;
        const sauce = state.sauces.find((it) => it.checked).price;
        const ingredients = getters.ingredientsInPizza.map(
          (it) => it.count * it.price
        );
        const sum =
          ingredients.length > 0
            ? ingredients.reduce((total, i) => total + i)
            : 0;
        return multiplier * (dough + sauce + sum);
      }
      return 0;
    },
    canCook(state, getters) {
      return state.title.length > 0 && getters.ingredientsInPizza.length > 0;
    },
  },

  actions: {
    getAllData({ commit }) {
      // TODO: Add api call
      const data = {
        id: createID(),
        title: "",
        sizes: sizes.map((it, i) => {
          let clItem = cloneDeep(it);
          clItem.class = PIZZA_SIZES_ENUM[clItem.multiplier];
          clItem.checked = i === 0;
          return clItem;
        }),
        doughs: dough.map((it, i) => {
          let clItem = cloneDeep(it);
          clItem.value = clItem.image.substring(18);
          clItem.value = clItem.value.substring(0, clItem.value.length - 4);
          clItem.checked = i === 0;
          return clItem;
        }),
        sauces: sauces.map((it, i) => {
          let clItem = cloneDeep(it);
          clItem.checked = i === 0;
          return clItem;
        }),
        ingredients: ingredients.map((it) => {
          let clItem = cloneDeep(it);
          clItem.value = clItem.image.substring(20);
          clItem.value = clItem.value.substring(0, clItem.value.length - 4);
          clItem.count = 0;
          return clItem;
        }),
      };
      commit(
        SET_DATA,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    addIngredient({ state, commit }, ingredient) {
      let item = cloneDeep(
        state.ingredients.find((it) => it.id === ingredient.id)
      );
      if (item.count < 3) {
        item.count++;
      }
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "ingredients",
          value: item,
        },
        { root: true }
      );
    },

    updateIngredient({ state, commit }, { index, value }) {
      let item = cloneDeep(state.ingredients[index]);
      item.count = item.count + value;
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "ingredients",
          value: item,
        },
        { root: true }
      );
    },

    updateTitle({ commit }, title) {
      commit(UPDATE_TITLE, title);
    },

    clearPizza({ state, commit }) {
      // TODO: Add api call
      const data = {
        id: createID(),
        title: "",
        sizes: setCheckedByIndex(cloneDeep(state.sizes), 0),
        doughs: setCheckedByIndex(cloneDeep(state.doughs), 0),
        sauces: setCheckedByIndex(cloneDeep(state.sauces), 0),
        ingredients: state.ingredients.map((it) => {
          let clItem = cloneDeep(it);
          clItem.count = 0;
          return clItem;
        }),
      };

      commit(
        SET_DATA,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    editPizza({ commit, state }, pizza) {
      // TODO: Add api call
      const data = {
        id: pizza.id,
        title: pizza.title,
        sizes: setCheckedById(cloneDeep(state.sizes, pizza.size.id)),
        doughs: setCheckedById(cloneDeep(state.doughs, pizza.dough.id)),
        sauces: setCheckedById(cloneDeep(state.sauces, pizza.sauce.id)),
        ingredients: state.ingredients.map((ing) => {
          let ingredient = pizza.ingredients.find((it) => it.id === ing.id);
          let clItem = cloneDeep(ing);
          clItem.count =
            typeof ingredient !== "undefined" ? ingredient.count : 0;
          return clItem;
        }),
      };

      commit(
        SET_DATA,
        {
          ...namespace,
          value: data,
        },
        { root: true }
      );
    },

    changeDough({ state, commit }, index) {
      commit(UPDATE_DOUGHS, setCheckedByIndex(cloneDeep(state.doughs), index));
    },

    changeSize({ state, commit }, index) {
      commit(UPDATE_SIZES, setCheckedByIndex(cloneDeep(state.sizes), index));
    },

    changeSauce({ state, commit }, index) {
      commit(UPDATE_SAUCES, setCheckedByIndex(cloneDeep(state.sauces), index));
    },

    pizza({ state, getters }) {
      const sauce = state.sauces.find((it) => it.checked);
      const dough = state.doughs.find((it) => it.checked);

      function getDough(dough) {
        switch (dough.value) {
          case "light":
            return {
              id: dough.id,
              name: "на тонком тесте",
            };
          case "large":
            return {
              id: dough.id,
              name: "на толстом тесте",
            };
          default:
            return {};
        }
      }

      return {
        id: state.id,
        title: state.title,
        ingredients: getters.ingredientsInPizza.map((it) => {
          return {
            id: it.id,
            name: it.name.toLowerCase(),
            count: it.count,
          };
        }),
        dough: getDough(dough),
        sauce: {
          id: sauce.id,
          name: sauce.name.toLowerCase(),
        },
        size: state.sizes.find((it) => it.checked),
        price: getters.price,
        count: 1,
      };
    },
  },

  mutations: {
    [UPDATE_TITLE](state, title) {
      state.title = title;
    },
    [UPDATE_DOUGHS](state, items) {
      state.doughs = items;
    },
    [UPDATE_SIZES](state, items) {
      state.sizes = items;
    },
    [UPDATE_SAUCES](state, items) {
      state.sauces = items;
    },
  },
};
