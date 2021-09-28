import misc from "@/static/misc.json";

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
    price(state) {
      if (state.pizzas.length > 0) {
        let pizzas = state.pizzas.map((it) => it.count * it.price);
        let additionals = state.additionals.map((it) => it.count * it.price);
        return (
          pizzas.reduce((total, i) => total + i) +
          additionals.reduce((total, i) => total + i)
        );
      }
      return 0;
    },
  },

  actions: {
    getAdditionals({ commit }) {
      // TODO: Add api call
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
      let item = cloneDeep(pizza);
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
      let item = cloneDeep(state.pizzas[index]);
      item.count = item.count + value;
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
      let item = cloneDeep(state.additionals[index]);
      item.count = item.count + value;
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "additionals",
          value: item,
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
