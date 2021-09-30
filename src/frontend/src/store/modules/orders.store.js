import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

const entity = "order";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async getOrders({ commit }) {
      const misc = await this.$api.orders.query();
      const data = misc.map((it) => cloneDeep(it));
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "orders",
          value: data,
        },
        { root: true }
      );
    },

    addOrder({ commit }, order) {
      const item = cloneDeep(order);
      commit(
        ADD_ENTITY,
        {
          ...namespace,
          entity: "orders",
          value: item,
        },
        { root: true }
      );
    },

    editOrder({ commit }, order) {
      const item = cloneDeep(order);
      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          entity: "orders",
          value: item,
        },
        { root: true }
      );
    },

    deleteOrder({ commit }, id) {
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          entity: "orders",
          id,
        },
        { root: true }
      );
    },
  },
};
