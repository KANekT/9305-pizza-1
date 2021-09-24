import user from "@/static/user.json";
import { capitalize } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";

const entity = "auth";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  getters: {
    isAuth(state) {
      return state.user !== undefined;
    },
  },
  actions: {
    logIn({ commit }) {
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "user",
          value: user,
        },
        { root: true }
      );
    },

    logOut({ commit }) {
      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "user",
          value: undefined,
        },
        { root: true }
      );
    },
  },
};
