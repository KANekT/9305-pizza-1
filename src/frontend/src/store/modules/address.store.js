import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";
import {
  SET_ENTITY,
  ADD_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

const entity = "address";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    address: [],
  },
  actions: {
    async getAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      const data = addresses.map((it) => {
        let clItem = cloneDeep(it);
        clItem.isCollapsed = true;
        return clItem;
      });
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "address",
          value: data,
        },
        { root: true }
      );
    },

    async editAddress({ commit, rootState }, { address, index }) {
      let item = null;
      const user = rootState.Auth.user;
      if (typeof address === "undefined") {
        item = {
          id: null,
          name: "",
          userId: typeof user !== "undefined" ? user.id : null,
          street: "",
          building: "",
          flat: "",
          comment: "",
          isCollapsed: false,
        };
      } else {
        item = cloneDeep(address);
        item.userId = typeof user !== "undefined" ? user.id : null;
        try {
          if (item.id !== null) {
            await this.$api.addresses.put(item);
            item.isCollapsed = true;
          } else {
            const entity = await this.$api.addresses.post(item);
            item.id = entity.id;
            item.isCollapsed = true;
          }
        } catch (e) {
          //console.log("error in addAddress");
        }
      }

      if (typeof index !== "undefined") {
        commit(
          REPLACE_ENTITY,
          {
            ...namespace,
            entity: "address",
            index: index,
            value: item,
          },
          { root: true }
        );
      } else {
        commit(
          item.id !== null ? UPDATE_ENTITY : ADD_ENTITY,
          {
            ...namespace,
            entity: "address",
            value: item,
          },
          { root: true }
        );
      }
    },

    async deleteAddress({ commit }, id) {
      await this.$api.addresses.delete(id);
      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          entity: "address",
          id,
        },
        { root: true }
      );
    },
  },
};
