import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";
import {
  SET_DATA,
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

const entity = "cart";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizzas: [],
    additionals: [],
  },
  getters: {
    isEmpty(state) {
      return state.pizzas.length === 0;
    },
    isNotEmpty(state) {
      return state.pizzas.length > 0;
    },
    price(state, getters) {
      if (getters.isNotEmpty) {
        const pizzas = state.pizzas.map((it) => it.count * it.price);
        const additionals = state.additionals.map((it) => it.count * it.price);
        return (
          pizzas.reduce((total, i) => total + i) +
          additionals.reduce((total, i) => total + i)
        );
      }
      return 0;
    },
  },

  actions: {
    async getAdditionals({ commit }) {
      const misc = await this.$api.misc.query();
      const data = misc.map((it) => {
        let clItem = cloneDeep(it);
        clItem.count = 0;
        clItem.src = require("./../../assets/img/" +
          clItem.image.substring(12));
        return clItem;
      });
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "additionals",
          value: data,
        },
        { root: true }
      );
    },

    addPizza({ commit }, pizza) {
      const item = cloneDeep(pizza);
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "pizzas",
          value: item,
        },
        { root: true }
      );
    },

    updatePizzaCount({ state, commit }, { index, value }) {
      let clItem = cloneDeep(state.pizzas[index]);
      clItem.count = clItem.count + value;
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "pizzas",
          value: clItem,
        },
        { root: true }
      );
    },

    deletePizza({ commit }, id) {
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          entity: "pizzas",
          id,
        },
        { root: true }
      );
    },

    updateAdditionalCount({ state, commit }, { index, value }) {
      let clItem = cloneDeep(state.additionals[index]);
      clItem.count = clItem.count + value;
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "additionals",
          value: clItem,
        },
        { root: true }
      );
    },

    clearData({ commit }) {
      commit(
        SET_DATA,
        {
          ...namespace,
          value: {
            pizzas: [],
            additionals: [],
          },
        },
        { root: true }
      );
    },
  },
};
