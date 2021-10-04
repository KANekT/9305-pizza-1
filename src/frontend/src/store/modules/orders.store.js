import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";
import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";

const entity = "orders";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async getOrders({ commit }) {
      const orders = await this.$api.orders.query();
      const data = orders.map((it) => cloneDeep(it));

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

    async addOrder({ commit }, order) {
      const item = cloneDeep(order);

      const { userId } = await this.$api.orders.post(item);

      if (userId != null) {
        const orders = await this.$api.orders.query();
        const data = orders.map((it) => cloneDeep(it));

        commit(
          SET_ENTITY,
          {
            ...namespace,
            entity: "orders",
            value: data,
          },
          { root: true }
        );
      }
    },

    async deleteOrder({ commit }, id) {
      await this.$api.orders.delete(id);
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
